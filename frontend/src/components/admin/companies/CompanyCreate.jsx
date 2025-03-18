import { COMPANY_API_ENDPOINT } from "@/components/API_EndPoints/API_EndPoints";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/ui/shared/Navbar";
import { setSingleCompany } from "@/redux/companyReducer";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CompanyCreate = () => {
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerCompany = async () => {
    if (!companyName) {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3500/api/v1/company/register`,
        { companyName, location },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setSingleCompany(response.data.company));
        toast(response.data.message);
        let companyId = response.data.company._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-10">
          <h1 className="font-bold text-xl sm:text-2xl">Your Company Name</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            What would you like to give your company name? You can change this
            later.
          </p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobHunt, Microsoft etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <Label>Location</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="Indore, Noida, Gurgaon etc."
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
        <div className="flex flex-col sm:flex-row items-center gap-4 my-10">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => navigate("/admin/companies")}
            value={companyName}
          >
            Cancel
          </Button>
          <Button className="w-full sm:w-auto" onClick={registerCompany}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
