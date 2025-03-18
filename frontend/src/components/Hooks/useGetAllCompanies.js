import axios from "axios";
import { useEffect } from "react";
import { COMPANY_API_ENDPOINT } from "../API_EndPoints/API_EndPoints";
import { useDispatch } from "react-redux";
import { setAllCompanies } from "@/redux/companyReducer";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAllCompanies() {
      try {
        const response = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
          withCredentials: true,
        });

        if (response.data.success) {
          dispatch(setAllCompanies(response.data.companies));
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchAllCompanies();
  }, []);
};

export default useGetAllCompanies;
