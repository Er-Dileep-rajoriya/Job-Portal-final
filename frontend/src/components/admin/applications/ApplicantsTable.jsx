import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/components/API_EndPoints/API_EndPoints";
import { toast } from "sonner";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = ({ applications }) => {
  // Handle status change for an applicant
  const handleChangeStatus = async (status, applicantId) => {
    try {
      const res = await axios.put(
        `${APPLICATION_API_ENDPOINT}/status/${applicantId}/update`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg">
      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <TableCaption className="text-sm text-gray-500 dark:text-gray-400">
          A list of your recent applied users
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2 text-left text-gray-900 dark:text-white">
              Full Name
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-gray-900 dark:text-white">
              Email
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-gray-900 dark:text-white">
              Contact
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-gray-900 dark:text-white">
              Resume
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-gray-900 dark:text-white">
              Date
            </TableHead>
            <TableHead className="px-4 py-2 text-right text-gray-900 dark:text-white">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications?.map((application) => (
            <TableRow
              key={application._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              <TableCell className="px-4 py-2 text-gray-900 dark:text-white">
                {application?.applicant?.fullName}
              </TableCell>
              <TableCell className="px-4 py-2 text-gray-900 dark:text-white">
                {application?.applicant?.email}
              </TableCell>
              <TableCell className="px-4 py-2 text-gray-900 dark:text-white">
                {application?.applicant?.phoneNumber}
              </TableCell>
              <TableCell className="px-4 py-2">
                {application.applicant?.profile?.resume ? (
                  <a
                    className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300"
                    href={application?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {application?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">NA</span>
                )}
              </TableCell>
              <TableCell className="px-4 py-2 text-gray-900 dark:text-white">
                {application?.applicant?.createdAt?.split("T")[0]}
              </TableCell>
              <TableCell className="px-4 py-2 text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    {shortlistingStatus.map((status, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          handleChangeStatus(status, application._id)
                        }
                        className="flex items-center my-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                      >
                        <span>{status}</span>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
