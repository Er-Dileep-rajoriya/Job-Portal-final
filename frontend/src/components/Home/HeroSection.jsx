import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedJobText } from "@/redux/jobReducer";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function for handling search
  const handleSearch = () => {
    dispatch(setSearchedJobText(searchQuery));
    navigate("/browse");
  };

  return (
    <div className="text-center p-5 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col gap-6 my-8">
        {/* Badge */}
        <span className="mx-auto px-4 py-2 rounded-full bg-[#FFE6E0] dark:bg-[#3A1C6E] text-[#F83002] dark:text-[#A78BFA] font-medium text-sm md:text-base">
          No. 1 Job Hunt Website
        </span>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug text-gray-900 dark:text-white">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2] dark:text-[#A78BFA]">Dream Jobs</span>
        </h1>

        {/* Subheading */}
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Discover opportunities tailored just for you. Whether you're a
          seasoned professional or starting your career, we help connect you
          with the perfect job to match your skills, passion, and ambition.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center w-full max-w-lg mx-auto shadow-lg border border-gray-200 dark:border-gray-700 rounded-full overflow-hidden bg-white dark:bg-gray-800">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 text-sm md:text-base outline-none border-none w-full md:w-auto bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <Button
            onClick={handleSearch}
            className="w-full md:w-auto rounded-none md:rounded-r-full bg-[#6A38C2] dark:bg-[#7C3AED] text-white flex items-center justify-center px-6 py-3 hover:bg-[#54309d] dark:hover:bg-[#6D28D9] transition-colors duration-300"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
