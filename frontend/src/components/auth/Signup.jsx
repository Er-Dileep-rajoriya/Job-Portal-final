import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { USER_API_ENDPOIN } from "../API_EndPoints/API_EndPoints";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { user } = useSelector((store) => store.authReducer);
  const [loading, setLoading] = useState(false);

  // If logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Handle input changes
  const changeEventHandlers = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Prepare form data
      const formData = new FormData();
      formData.append("fullName", input.fullName);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("password", input.password);
      formData.append("role", input.role);

      if (input.file) {
        formData.append("imageUrl", input.file);
      }

      // Send data to the backend
      const response = await axios.post(
        `${USER_API_ENDPOIN}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
      } else {
        console.log("Registration failed!");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 my-1">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl"
        >
          <h1 className="font-bold text-2xl text-gray-800 dark:text-white text-center mb-6">
            Sign Up
          </h1>
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <Label className="block text-gray-600 dark:text-gray-300">
                Full Name
              </Label>
              <Input
                type="text"
                name="fullName"
                value={input.fullName}
                onChange={changeEventHandlers}
                placeholder="Dileep Rajoriya"
                className="mt-1 w-full border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Email */}
            <div>
              <Label className="block text-gray-600 dark:text-gray-300">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandlers}
                placeholder="dileep@gmail.com"
                className="mt-1 w-full border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Phone Number */}
            <div>
              <Label className="block text-gray-600 dark:text-gray-300">
                Phone Number
              </Label>
              <Input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandlers}
                placeholder="8080808080"
                className="mt-1 w-full border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Password */}
            <div>
              <Label className="block text-gray-600 dark:text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={input.password}
                  onChange={changeEventHandlers}
                  placeholder="********"
                  className="mt-1 w-full border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none transition-colors duration-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Role Selection */}
          <div className="mt-6">
            <Label className="block text-gray-600 dark:text-gray-300">
              Role
            </Label>
            <RadioGroup className="flex gap-4 mt-2">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandlers}
                  className="cursor-pointer"
                />
                <Label className="text-gray-600 dark:text-gray-300">
                  Student
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandlers}
                  className="cursor-pointer"
                />
                <Label className="text-gray-600 dark:text-gray-300">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Profile Picture */}
          <div className="mt-4">
            <Label className="block text-gray-600 dark:text-gray-300">
              Profile Picture
            </Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="mt-2 w-full border-gray-300 dark:border-gray-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button
              className="w-full mt-6 py-2 bg-blue-500 text-white rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300"
            >
              Sign Up
            </Button>
          )}

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
