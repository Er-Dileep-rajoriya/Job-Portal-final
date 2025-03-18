import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useGetAllJobs from "../Hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();
  const { allJobs, searchedJobText } = useSelector((state) => state.jobReducer);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const { user } = useSelector((store) => store.authReducer);

  if (!user) return;

  // Filter all jobs based on search text
  useEffect(() => {
    if (searchedJobText) {
      const searchText = searchedJobText.toLowerCase();

      const filteredData = allJobs.filter((job) => {
        if (
          job.location.toLowerCase().includes(searchText) ||
          job.title.toLowerCase().includes(searchText)
        ) {
          return job;
        }
      });

      setFilteredJobs(filteredData);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [allJobs, searchedJobText]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Filter Section */}
          <div className="w-full lg:w-1/4">
            <FilterCard />
          </div>

          {/* Job Listing Section */}
          <div className="w-full lg:w-3/4">
            {filteredJobs.length <= 0 ? (
              <span className="block text-center text-gray-500 dark:text-gray-400">
                Job not found
              </span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
