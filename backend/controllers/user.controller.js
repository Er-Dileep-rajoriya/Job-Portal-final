import dotenv from "dotenv";
dotenv.config({});
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../cloudinary.js";
import getDataUri from "../dataUriParser.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    // if any field empty then return back with error
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All Fields Required!",
        success: false,
      });
    }

    // set the profile photo also if provided
    const file = req.file;
    let cloudRes = "";

    if (file) {
      const fileUri = getDataUri(file);
      cloudRes = await cloudinary.uploader.upload(fileUri.content);
    }

    // check if same user is already registed before with this email
    const user = await User.findOne({ email });

    // if user exists then return back with error
    if (user) {
      return res.status(400).json({
        message: "User already Exists with this Email.",
        success: false,
      });
    }

    // register

    // hashing password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt value

    const registedUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      profile: {
        profilePhoto: cloudRes.secure_url,
      },
    });

    return res.status(201).json({
      message: "Account Successfully Created.",
      success: true,
      user: registedUser,
    });
  } catch (error) {
    console.log("Error in Registering : ", error);
  }
};

export const login = async (req, res) => {
  try {
    // Destructure the request body
    const { email, password, role } = req.body;

    // Check if all required fields are provided
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password, and role are required.",
        success: false,
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password.",
        success: false,
      });
    }

    // Compare the password with the stored hash
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If the password doesn't match, return an error
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid credentials.",
        success: false,
      });
    }

    // Check if the provided role matches the user's role
    if (role !== user.role) {
      return res.status(400).json({
        message: "User does not exist with the provided role.",
        success: false,
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        fullName: user.fullName,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Prepare the user object to return
    const loggedInUser = {
      _id: user._id,
      fullName: user.fullName,
      role: user.role,
      profile: user.profile,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };

    // Set the JWT token in the cookie and send the response
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // Cookie expiration (1 day)
        httpOnly: true, // Prevent JavaScript access to the cookie
        sameSite: "strict", // Prevent CSRF attacks
      })
      .json({
        message: `Welcome back, ${user.fullName}!`,
        user: loggedInUser,
        success: true,
      });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during login:", error);

    // Return a server error response
    return res.status(500).json({
      message: "An error occurred during login.",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Successfully Logged Out.",
      success: true,
    });
  } catch (err) {
    console.log("Error in Logged out : ", err);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, skills, bio } = req.body;
    // console.log(fullName, email, phoneNumber, skills, bio);

    // upload file to cloudinary
    const file = req.file; // getting from multer

    let cloudResponse = null;

    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User Not Found!",
        success: false,
      });
    }

    // if found then update the details

    if (fullName) {
      user.fullName = fullName;
    }

    if (email) {
      user.email = email;
    }

    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (skills) {
      const skillsArray = skills.split(",");
      user.profile.skills = skillsArray;
    }

    if (bio) {
      user.profile.bio = bio;
    }

    // upload resume to cloudinary
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
      user.profile.resumeOriginalName = file.originalname; // saving the original name
    }

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullName: user.fullName,
      role: user.role,
      profile: user.profile,
      phoneNumber: user.phoneNumber,
      email: user.email,
    };

    return res.status(200).json({
      message: "Profile Successfully Updated.",
      success: true,
      user: updatedUser,
    });
  } catch (err) {
    console.log("Error in Updating Profile : ", err);
  }
};
