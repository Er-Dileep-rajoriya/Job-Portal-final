import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/shared/Navbar";
import AdminJobsTable from "./AdminJobsTable";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../../API_EndPoints/API_EndPoints";
import { useDispatch, useSelector } from "react-redux";
import { setAdminJobs, setSearchText } from "@/redux/jobReducer";
import { useNavigate } from "react-router-dom";

const AdminJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { adminJobs } = useSelector((state) => state.jobReducer);
  const { user } = useSelector((store) => store.authReducer);

  // Fetch admin jobs whenever the user state changes
  useEffect(() => {
    async function fetchAdminJobs() {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getAdminJobs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAdminJobs(res.data.jobs));
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "An error occurred");
      }
    }

    if (user) {
      fetchAdminJobs();
    } else {
      // Redirect to login if the user is not authenticated
      navigate("/login");
    }
  }, [user, dispatch, navigate]); // Triggers whenever `user` changes

  // Update search text in Redux store
  useEffect(() => {
    dispatch(setSearchText(searchQuery));
  }, [searchQuery, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-5">
          <Input
            className="w-full sm:w-auto"
            placeholder="Filter by name, role"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            className="w-full sm:w-auto"
            onClick={() => navigate("/admin/jobs/create")}
          >
            Post New Job
          </Button>
        </div>
        <AdminJobsTable jobs={adminJobs} />
      </div>
    </div>
  );
};

export default AdminJobs;
