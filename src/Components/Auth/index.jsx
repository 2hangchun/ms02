import { useLocation, Navigate } from "react-router-dom";

function Auth({ children }) {
  const token = localStorage.getItem("token") || "";
  const location = useLocation();
  if (token && location.pathname === "/login") {
    return <Navigate to="/" />;
  } else if (!token && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }
  return children;
}

export default function withAuth(comp) {
  return <Auth>{comp}</Auth>;
}
