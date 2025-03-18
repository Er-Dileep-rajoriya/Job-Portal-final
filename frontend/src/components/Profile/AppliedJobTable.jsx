import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../API_EndPoints/API_EndPoints";
import { useDispatch, useSelector } from "react-redux";
import { setAllAppliedJobs } from "@/redux/jobReducer";

const AppliedJobTable = () => {
  const dispatch = useDispatch();
  const { allAppliedJobs } = useSelector((state) => state.jobReducer);

  // Fetch all applied jobs
  useEffect(() => {
    async function fetchAllAppliedJobs() {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications));
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    }
    fetchAllAppliedJobs();
  }, [dispatch]);

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          A list of your applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-900 dark:text-white">
              Date
            </TableHead>
            <TableHead className="text-gray-900 dark:text-white">
              Job Role
            </TableHead>
            <TableHead className="text-gray-900 dark:text-white">
              Company
            </TableHead>
            <TableHead className="text-right text-gray-900 dark:text-white">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs?.length <= 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-gray-600 dark:text-gray-400"
              >
                You have not applied to any job
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs?.map((application) => (
              <TableRow
                key={application._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <TableCell className="text-gray-700 dark:text-gray-300">
                  {application?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">
                  {application?.job?.title}
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">
                  {application?.job?.company?.name}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      application?.status === "rejected"
                        ? "bg-red-400 dark:bg-red-500"
                        : application.status === "pending"
                        ? "bg-gray-400 dark:bg-gray-500"
                        : "bg-green-400 dark:bg-green-500"
                    } text-white`}
                  >
                    {application.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
