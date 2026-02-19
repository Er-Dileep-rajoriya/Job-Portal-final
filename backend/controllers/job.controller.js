import mongoose from "mongoose";
import { Job } from "../models/job.model.js";

// admin job create karega
export const postJob = async (req, res) => {
  try {
    let {
      title,
      description,
      requirements,
      salary,
      experience,
      location,
      jobType,
      position,
      companyId,
    } = req.body;

    if (
      !title?.trim() ||
      !description?.trim() ||
      !requirements?.trim() ||
      !salary ||
      !experience ||
      !location?.trim() ||
      !jobType?.trim() ||
      !position?.trim() ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }
    experience = Number(experience);
    if (typeof experience !== 'number') {
      return res.status(400).json({
        message: "Experience level must be a number.",
        success: false,
      });
    }

    const parsedSalary = parseFloat(salary);
    if (isNaN(parsedSalary) || parsedSalary <= 0) {
      return res.status(400).json({
        message: "Salary must be a valid positive number.",
        success: false,
      });
    }

    if (parsedSalary >= 100) {
      return res.status(400).json({
        message: "Salary must be a under 100LPA.",
        success: false,
      });
    }

    const requirementsArray = requirements
      .split(",")
      .map((req) => req.trim())
      .filter((req) => req.length > 0);

    if (requirementsArray.length === 0) {
      return res.status(400).json({
        message: "At least one requirement is required.",
        success: false,
      });
    }

    const createdJob = await Job.create({
      title: title.trim(),
      description: description.trim(),
      requirements: requirementsArray,
      salary: parsedSalary,
      experienceLevel: experience,
      location: location.trim(),
      jobType: jobType.trim(),
      position: position.trim(),
      created_by: req.userId,
      company: companyId,
    });

    const job = await Job.findById(createdJob._id).populate("company");

    return res.status(201).json({
      message: "Job Successfully Created.",
      success: true,
      job,
    });

  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// student service
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    // filter jobs by title and description
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs Not Found!",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
      message: "Jobs Found",
    });
  } catch (err) {
    console.log(err);
  }
};

// student service
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!mongoose.isValidObjectId(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Job id!",
      });
    }

    const job = await Job.findById(jobId).populate({
      path: "applications",
    });

    if (!job) {
      return res.status(404).json({
        message: "Job Not Found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job Found.",
      job,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// admin ne job bhi jobs create ki he vo return hogi
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.userId;

    const jobs = await Job.find({ created_by: adminId })
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs Not Found!",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
      message: "Jobs Found.",
    });
  } catch (error) {
    console.log(error);
  }
};
