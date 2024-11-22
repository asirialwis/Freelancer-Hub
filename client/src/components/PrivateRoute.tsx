import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../auth/authContex"; // Correct the import path if needed

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const authStatus = await isAuthenticated();
      setAuthenticated(authStatus);
    };

    checkAuthentication();
  }, []);

  // Loading state while checking authentication
  if (authenticated === null) {
    return <div>Loading...</div>; // or a spinner, depending on your UI
  }

  return authenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
