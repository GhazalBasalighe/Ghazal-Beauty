import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = (Component) => (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin_login");
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? <Component {...props} /> : null;
};
