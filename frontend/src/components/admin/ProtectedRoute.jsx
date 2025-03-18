import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null || !user || user.role != "recruiter") {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
}

export default ProtectedRoute;
