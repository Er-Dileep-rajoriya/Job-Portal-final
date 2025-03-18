import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { USER_API_ENDPOIN } from "../API_EndPoints/API_EndPoints";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authReducer";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.authReducer);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const changeEventHandlers = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // If logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      setLoading(true);
      const response = await axios.post(`${USER_API_ENDPOIN}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        navigate("/");
        toast.success(response.data.message);
      } else {
        console.log("Login failed!");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 my-1">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl"
        >
          <h1 className="font-bold text-2xl text-gray-800 dark:text-white text-center mb-6">
            Login
          </h1>
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <Label className="block text-gray-600 dark:text-gray-300">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandlers}
                placeholder="dileep@gmail.com"
                className="mt-1 w-full border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Password Input */}
            <div>
              <Label className="block text-gray-600 dark:text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={input.password}
                  onChange={changeEventHandlers}
                  placeholder="********"
                  className="mt-1 w-full border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white pr-10"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            </div>
          </div>

          {/* Role Selection */}
          <div className="mt-6">
            <Label className="block text-gray-600 dark:text-gray-300">
              Role
            </Label>
            <RadioGroup className="flex gap-4 mt-2">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandlers}
                  className="cursor-pointer"
                />
                <Label className="text-gray-600 dark:text-gray-300">
                  Student
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandlers}
                  className="cursor-pointer"
                />
                <Label className="text-gray-600 dark:text-gray-300">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button
              className="w-full mt-6 py-2 bg-blue-500 text-white rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300"
            >
              Login
            </Button>
          )}

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
