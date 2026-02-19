import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Jobs from "./components/Jobs/Jobs";
import Browse from "./components/Browse/Browse";
import Profile from "./components/Profile/Profile";
import JobDescription from "./components/Jobs/JobDescription";
import Companies from "./components/admin/companies/Companies";
import CompanyCreate from "./components/admin/companies/CompanyCreate";
import CompanySetup from "./components/admin/companies/CompanySetup";
import AdminJobs from "./components/admin/jobs/AdminJobs";
import PostJob from "./components/admin/jobs/PostJob";
import Applicants from "./components/admin/applications/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import ProtectStudentRoute from "./components/ProtectStudentRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: (
        <Jobs />
    ),
  },
  {
    path: "/jobs/description/:id",
    element: (
      <JobDescription />
    ),
  },
  {
    path: "/browse",
    element: (
        <Browse />
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectStudentRoute>
        {" "}
        <Profile />
      </ProtectStudentRoute>
    ),
  },
  // for admin(recruiter)
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
