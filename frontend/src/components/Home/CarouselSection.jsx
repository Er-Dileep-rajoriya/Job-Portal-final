import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedJobText } from "@/redux/jobReducer";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function for handling search
  const handleSearch = (text) => {
    dispatch(setSearchedJobText(text));
    navigate("/browse");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              className="md:basis-1/2 lg:basis-1/3 px-2"
              key={index}
            >
              <Button
                variant="outline"
                className="w-full rounded-full text-sm md:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                onClick={() => handleSearch(cat)}
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
