import { useEffect } from "react";
import useGetAllJobs from "../Hooks/useGetAllJobs";
import Footer from "../ui/shared/Footer";
import Navbar from "../ui/shared/Navbar";
import CategoryCarousel from "./CarouselSection";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  // initialy getting all the jobs
  useGetAllJobs();

  useEffect(() => {
    if (user?.role == "recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </>
  );
}

export default Home;
