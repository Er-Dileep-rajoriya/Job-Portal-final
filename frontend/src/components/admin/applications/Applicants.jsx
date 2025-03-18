import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import Navbar from "@/components/ui/shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_ENDPOINT } from "@/components/API_EndPoints/API_EndPoints";
import { useParams } from "react-router-dom";
import { setJob } from "@/redux/applicationReducer";
import axios from "axios";

const Applicants = () => {
  const { job } = useSelector((state) => state.applicationReducer);
  const params = useParams();
  const dispatch = useDispatch();

  // Fetch applicants and store them in the Redux store
  useEffect(() => {
    async function fetchApplicants() {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setJob(res.data.job)); // Inside job, there is a field for applicants
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchApplicants();
  }, [dispatch, params.id]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h1 className="font-bold text-xl my-5 text-center md:text-left text-gray-900 dark:text-white">
          Applicants ({job?.applications?.length || 0})
        </h1>

        {/* Applicants Table */}
        <ApplicantsTable applications={job?.applications} />
      </div>
    </div>
  );
};

export default Applicants;
