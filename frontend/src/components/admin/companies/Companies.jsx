import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/shared/Navbar";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/components/Hooks/useGetAllCompanies";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setSearchCompanyByText } from "@/redux/companyReducer";

const Companies = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { allCompanies } = useSelector((state) => state.companyReducer);
  const dispatch = useDispatch();
  // getting all companies at initial render
  useGetAllCompanies();

  useEffect(() => {
    dispatch(setSearchCompanyByText(searchText));
  }, [searchText]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-5">
          <Input
            className="w-full sm:w-auto"
            placeholder="Filter by name"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="w-full sm:w-auto"
          >
            New Company
          </Button>
        </div>
        <CompaniesTable companies={allCompanies} />
      </div>
    </div>
  );
};

export default Companies;
