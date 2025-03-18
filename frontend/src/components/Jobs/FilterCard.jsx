import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { setSearchedJobText } from "@/redux/jobReducer";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi NCR",
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Noida",
      "Gurgaon",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Java Developer",
      "Data Science",
    ],
  },
];

const FilterCard = () => {
  const [selectValue, setSelectValue] = useState("");
  const dispatch = useDispatch();

  // Update Redux store when the selected value changes
  useEffect(() => {
    dispatch(setSearchedJobText(selectValue));
  }, [selectValue, dispatch]);

  // Handle radio button selection
  const changeValue = (value) => {
    setSelectValue(value);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Filter Header */}
      <h1 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
        Filter Jobs
      </h1>
      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Radio Group for Filters */}
      <RadioGroup value={selectValue} onValueChange={changeValue}>
        {filterData.map((data, index) => (
          <div key={index} className="my-4">
            {/* Filter Type Heading */}
            <h2 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
              {data.filterType}
            </h2>

            {/* Filter Options */}
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2" key={itemId}>
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="text-[#6A38C2] dark:text-[#A78BFA] border-gray-300 dark:border-gray-600"
                  />
                  <Label
                    htmlFor={itemId}
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
