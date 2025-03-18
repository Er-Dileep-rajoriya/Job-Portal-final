import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  APPLICATION_API_ENDPOINT,
  JOB_API_ENDPOINT,
} from "../API_EndPoints/API_EndPoints";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.jobReducer);
  const { user } = useSelector((store) => store.authReducer);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const navigate = useNavigate();
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Apply for the job
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // Update the Redux store
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Fetch single job details
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); // Sync state with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      {/* Job Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl text-gray-900 dark:text-white">
            {singleJob?.title}
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge
              className="text-blue-700 dark:text-blue-400 font-bold"
              variant="ghost"
            >
              {singleJob?.position} Positions
            </Badge>
            <Badge
              className="text-[#F83002] dark:text-[#FF6B6B] font-bold"
              variant="ghost"
            >
              {singleJob?.jobType}
            </Badge>
            <Badge
              className="text-[#7209b7] dark:text-[#A78BFA] font-bold"
              variant="ghost"
            >
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 dark:bg-gray-700 cursor-not-allowed"
              : "bg-[#7209b7] dark:bg-[#7C3AED] hover:bg-[#5f32ad] dark:hover:bg-[#6D28D9]"
          } text-white transition-colors duration-300`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Description Section */}
      <h1 className="border-b-2 border-b-gray-300 dark:border-b-gray-700 font-medium py-4 text-gray-900 dark:text-white">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1 text-gray-900 dark:text-white">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800 dark:text-gray-300">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-900 dark:text-white">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800 dark:text-gray-300">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-900 dark:text-white">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800 dark:text-gray-300">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-900 dark:text-white">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800 dark:text-gray-300">
            {singleJob?.experienceLevel} yrs
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-900 dark:text-white">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800 dark:text-gray-300">
            {singleJob?.salary}LPA
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-900 dark:text-white">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800 dark:text-gray-300">
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-900 dark:text-white">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800 dark:text-gray-300">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
