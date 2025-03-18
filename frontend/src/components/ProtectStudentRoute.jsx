import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectStudentRoute = ({ children }) => {
  const { user } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user == null || user.role != "student") {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
};

export default ProtectStudentRoute;
