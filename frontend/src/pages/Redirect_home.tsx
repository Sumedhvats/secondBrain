import { Navigate } from "react-router-dom";

export const Redirect_home = () => {
  return <Navigate to="/signin" replace />;
};
