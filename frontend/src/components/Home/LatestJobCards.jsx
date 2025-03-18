import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/jobs/description/" + job._id)}
      className="p-5 rounded-lg shadow-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      {/* Company Name and Location */}
      <div>
        <h1 className="font-medium text-lg text-gray-900 dark:text-white">
          {job?.company?.name}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">India</p>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className="font-bold text-lg my-2 text-gray-900 dark:text-white">
          {job.title}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {job.description}
        </p>
      </div>

      {/* Job Details (Badges) */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge
          className="text-blue-700 dark:text-blue-400 font-bold"
          variant="ghost"
        >
          {job.position} Positions
        </Badge>
        <Badge
          className="text-[#F83002] dark:text-[#FF6B6B] font-bold"
          variant="ghost"
        >
          {job.jobType}
        </Badge>
        <Badge
          className="text-[#7209b7] dark:text-[#A78BFA] font-bold"
          variant="ghost"
        >
          {job.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
