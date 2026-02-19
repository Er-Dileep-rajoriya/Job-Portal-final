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
  // useEffect(() => {
  //   if (user == null) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

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
      navigate("/login");
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
    <div className="max-w-6xl mx-auto my-12 px-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 transition-all duration-300">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {singleJob?.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                {singleJob?.position} Position
                {singleJob?.position > 1 && "s"}
              </Badge>

              <Badge className="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
                {singleJob?.jobType}
              </Badge>

              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                ₹ {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>

          <Button
            onClick={isApplied ? undefined : applyJobHandler}
            disabled={isApplied}
            className={`rounded-xl px-6 py-2 text-white transition-all duration-300 ${isApplied
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
              }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        <div className="border-b border-gray-300 dark:border-gray-700 my-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Role
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-1">
              {singleJob?.title}
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Location
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-1">
              {singleJob?.location}
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Experience
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-1">
              {singleJob?.experienceLevel} years
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Total Applicants
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-1">
              {singleJob?.applications?.length || 0}
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Posted On
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-1">
              {singleJob?.createdAt
                ? new Date(singleJob.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
                : "-"}
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Last Updated
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-1">
              {singleJob?.updatedAt
                ? new Date(singleJob.updatedAt).toLocaleDateString("en-IN")
                : "-"}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Job Description
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {singleJob?.description}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Requirements
          </h2>

          <div className="flex flex-wrap gap-3">
            {singleJob?.requirements?.length > 0 ? (
              singleJob.requirements.map((req, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full text-sm bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  {req}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No specific requirements listed.</p>
            )}
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Job ID: {singleJob?._id}
        </div>

      </div>
    </div>
  );
};

export default JobDescription;
