import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2 } from "lucide-react";
import { Menu } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOIN } from "@/components/API_EndPoints/API_EndPoints";
import axios from "axios";
import { setUser } from "@/redux/authReducer";
import { toast } from "sonner";
import { setAdminJobs } from "@/redux/jobReducer";
const dummyImage = "https://github.com/shadcn.png";

import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTheme } from "@/components/theme/ThemeProvider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Navbar = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /// logout the user
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOIN}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        dispatch(setAdminJobs([]));
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.res.data.message);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 px-4 shadow-md top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <Link to={"/"}>
            <h1 className="text-2xl font-bold dark:text-white">
              Job<span className="text-[#F83002]">Hunt</span>
            </h1>
          </Link>
        </div>
        {/* Hamburger menu for small screens */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            className="p-2 focus:outline-none dark:text-white"
          >
            <Menu size={24} />
          </button>
        </div>
        {/* Navigation */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-white dark:bg-gray-900 z-10 shadow-md lg:shadow-none lg:block lg:static lg:w-auto`}
        >
          <div className="flex flex-col lg:flex-row items-center lg:gap-12 px-4 lg:px-0">
            <ul className="flex flex-col lg:flex-row font-medium items-center gap-5">
              {user && user?.role == "recruiter" ? (
                <>
                  <li>
                    <NavLink
                      to="/admin/companies"
                      className={
                        ({ isActive }) =>
                          isActive
                            ? "text-[#6A38C2] font-bold dark:text-purple-400" // Active styles
                            : "hover:text-[#6A38C2] dark:hover:text-purple-400 cursor-pointer" // Default styles
                      }
                    >
                      Companies
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/jobs"
                      className={
                        ({ isActive }) =>
                          isActive
                            ? "text-[#6A38C2] font-bold dark:text-purple-400" // Active styles
                            : "hover:text-[#6A38C2] dark:hover:text-purple-400 cursor-pointer" // Default styles
                      }
                    >
                      Jobs
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/"
                      className={
                        ({ isActive }) =>
                          isActive
                            ? "text-[#6A38C2] font-bold dark:text-purple-400" // Active styles
                            : "hover:text-[#6A38C2] dark:hover:text-purple-400 cursor-pointer" // Default styles
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/jobs"
                      className={
                        ({ isActive }) =>
                          isActive
                            ? "text-[#6A38C2] font-bold dark:text-purple-400" // Active styles
                            : "hover:text-[#6A38C2] dark:hover:text-purple-400 cursor-pointer" // Default styles
                      }
                    >
                      Jobs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/browse"
                      className={
                        ({ isActive }) =>
                          isActive
                            ? "text-[#6A38C2] font-bold dark:text-purple-400" // Active styles
                            : "hover:text-[#6A38C2] dark:hover:text-purple-400 cursor-pointer" // Default styles
                      }
                    >
                      Browse
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            {!user ? (
              <div className="flex flex-col lg:flex-row items-center gap-2 mt-4 lg:mt-0">
                <ModeToggle />
                <Link to="/login">
                  {" "}
                  <Button variant="outline" className="w-full lg:w-auto">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full lg:w-auto">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <ModeToggle />
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        className="w-10 rounded-full"
                        src={
                          user?.profile?.profilePhoto
                            ? user?.profile?.profilePhoto
                            : dummyImage
                        }
                        alt="@shadcn"
                      />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-zinc-300 dark:bg-gray-800">
                    <div>
                      <div className="flex gap-2 space-y-2">
                        <Avatar className="cursor-pointer">
                          <AvatarImage
                            className="w-10 rounded-full"
                            src={
                              user?.profile?.profilePhoto
                                ? user?.profile?.profilePhoto
                                : dummyImage
                            }
                            alt="@shadcn"
                          />
                        </Avatar>
                        <div>
                          <h4 className="font-medium dark:text-white">
                            {user?.fullName}
                          </h4>
                          <p className="text-sm text-muted-foreground dark:text-gray-300">
                            {user?.profile?.bio}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col my-2 text-gray-600 dark:text-gray-300">
                        {user && user?.role == "student" ? (
                          <div className="flex w-fit items-center gap-2 cursor-pointer">
                            <User2 />
                            <Button variant="link">
                              <Link to={"/profile"}>View Profile</Link>
                            </Button>
                          </div>
                        ) : null}

                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                          <LogOut />
                          <Button variant="link" onClick={logoutHandler}>
                            Logout
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
