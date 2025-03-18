import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useSelector } from "react-redux";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.authReducer);
  const [haveResume, setHaveResume] = useState(false);
  const navigate = useNavigate();

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Check if the user has a resume
  useEffect(() => {
    if (user?.profile?.resume) {
      setHaveResume(true);
    }
  }, [user]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Navbar />
      {/* Profile Section */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl my-5 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
          {/* User Avatar and Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 md:h-24 md:w-24">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-lg md:text-xl text-gray-900 dark:text-white">
                {user?.fullName}
              </h1>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                {user?.profile?.bio}
              </p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
              {user?.email}
            </span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
              {user?.phoneNumber}
            </span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-5">
          <h1 className="font-medium text-lg md:text-xl text-gray-900 dark:text-white">
            Skills
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {user?.profile?.skills?.length ? (
              user?.profile?.skills?.map((item, index) => (
                <Badge
                  key={index}
                  className="text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-600 dark:text-gray-400">NA</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="grid w-full gap-1.5 mt-5">
          <Label className="text-md font-bold text-gray-900 dark:text-white">
            Resume
          </Label>
          {haveResume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-600 dark:text-gray-400">NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl mt-5 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h1 className="font-bold text-lg mb-5 text-gray-900 dark:text-white">
          Applied Jobs
        </h1>
        <AppliedJobTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
