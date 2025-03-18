import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import Job from "../Jobs/Job";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../API_EndPoints/API_EndPoints";
import { setAllJobs, setSearchedJobText } from "@/redux/jobReducer";
import { useNavigate } from "react-router-dom";

const Browse = () => {
  const { searchedJobText } = useSelector((state) => state.jobReducer);
  const dispatch = useDispatch();
  const { allJobs } = useSelector((state) => state.jobReducer);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducer);

  // if not authenticated then send to login page
  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
  }, []);

  // get all searched jobs from api as soon render this page
  useEffect(() => {
    async function fetchSearchedJobs() {
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get?keyword=${searchedJobText}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
          dispatch(setSearchedJobText(""));
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    }

    fetchSearchedJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-xl my-10 text-center sm:text-left">
          Results ({allJobs.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allJobs.map((job, index) => {
            return <Job key={index} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
