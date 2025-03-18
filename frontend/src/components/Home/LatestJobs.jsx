import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((state) => state.jobReducer);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white">
        <span className="text-[#6A38C2] dark:text-[#A78BFA]">
          Latest & Top{" "}
        </span>{" "}
        Job Openings
      </h1>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10">
        {allJobs.length <= 0 ? (
          <span className="text-center text-gray-600 dark:text-gray-400 col-span-full">
            No Job Available
          </span>
        ) : (
          allJobs
            ?.slice(0, 8)
            .map((job, index) => <LatestJobCards key={index} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
