import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  // Function to calculate days ago
  const daysAgo = (createdAtDate) => {
    const createdAt = new Date(createdAtDate);
    const currDate = new Date();

    const timeDiff = currDate - createdAt;

    return Math.floor(timeDiff / (24 * 60 * 60 * 1000));
  };

  return (
    <div className="p-4 rounded-md shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {daysAgo(job.createdAt) <= 0
            ? "Today"
            : daysAgo(job.createdAt) + " days ago"}
        </p>
        <Button
          variant="outline"
          className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <Bookmark className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-2 mt-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={job?.company?.logo} alt="Company Logo" />
        </Avatar>
        <div>
          <h2 className="text-sm font-medium text-gray-900 dark:text-white">
            {job?.company?.name}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">India</p>
        </div>
      </div>

      {/* Job Description */}
      <div className="mt-4">
        <h1 className="font-bold text-md text-gray-900 dark:text-white">
          {job.title}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          {job.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mt-4 flex-wrap">
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
          {job.salary}LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          className="text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
          onClick={() => navigate(`/jobs/description/${job._id}`)}
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] dark:bg-[#7C3AED] text-sm text-white hover:bg-[#5B21B6] dark:hover:bg-[#6D28D9] transition-colors duration-300">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
