import React, { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { Button, BackButton } from "../../base";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { setUserName } from "../../../store/slices/authSlice";
import { validationSchema } from "../../../utils";
import { loginUser } from "../../../store/thunk/thunk";

export function LoginForm({ title }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // TO RENDER THE CORRECT LOGIN FORM ACCORDING TO URL
  const location = useLocation();
  let isUserForm = true;
  if (location.pathname.includes("admin")) {
    isUserForm = false;
  }

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  function handlePasswordVisibility() {
    setIsPasswordHidden((isPasswordHidden) => !isPasswordHidden);
  }

  async function handleSubmit(values) {
    try {
      const { userName, password } = values;
      const response = await dispatch(
        loginUser({ username: userName, password })
      );
      const userRole = response.payload.data.user.role;
      dispatch(setUserName(userName));

      if (response.payload.status === "success") {
        // AUTHORIZE USER AFTER AUTHENTICATION
        if (
          (userRole === "ADMIN" && !isUserForm) ||
          (userRole === "USER" && isUserForm)
        ) {
          toast.success(`سلام ${userName} 👋`, {
            position: "top-left",
            style: {
              padding: "10px",
              fontWeight: 700,
            },
          });
          setTimeout(() => {
            if (userRole === "ADMIN")
              navigate("/admin/stock_price_manage");
            else navigate("/");
          }, 500);
        } else if (userRole === "ADMIN" && isUserForm) {
          toast.error("لطفاً از پنل مربوط به مدیریت استفاده کنید", {
            position: "top-left",
            style: {
              padding: "10px",
              fontWeight: 700,
            },
          });
          setTimeout(() => {
            navigate("/admin_login");
          }, 500);
        } else {
          toast.error("لطفاً از پنل مربوط به کاربران استفاده کنید", {
            position: "top-left",
            style: {
              padding: "10px",
              fontWeight: 700,
            },
          });
          setTimeout(() => {
            navigate("/user_login");
          }, 500);
        }
      } else if (response.payload === 401) {
        toast.error("نام کاربری یا رمز عبور اشتباه است", {
          position: "top-left",
          style: {
            padding: "10px",
            fontWeight: 700,
          },
        });
      } else {
        toast.error("خطا در ورود به سیستم", {
          position: "top-left",
          style: {
            padding: "10px",
            fontWeight: 700,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // RENDER APPROPRIATE SVG ACCORDING TO PASSWORD VISIBILITY
  const visibleIcon = (
    <div className="absolute left-2 bottom-2 cursor-pointer">
      {isPasswordHidden ? (
        <Eye size={24} onClick={handlePasswordVisibility} />
      ) : (
        <EyeSlash size={24} onClick={handlePasswordVisibility} />
      )}
    </div>
  );

  // HANDLE VALIDATION USING FORMIK
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  // REMOVE COOKIES WHEN LOGGING OUT
  function handleBackBtnClick() {
    Cookies.remove("refreshToken");
  }

  return (
    <div className="grid place-items-center h-screen overflow-hidden">
      <Toaster />
      {/* BACKGROUND WAVE SVG */}
      <img
        src="src/assets/bgWave.png"
        alt="background"
        className=" -z-10 object-cover"
      />
      <div className="admin-panel-loginForm">
        <h1 className="admin-panel-title">{title}</h1>
        <form
          className="flex flex-col gap-8"
          onSubmit={formik.handleSubmit}
        >
          {/* USERNAME SECTION */}
          <div className="flex flex-col gap-3 relative">
            <label htmlFor="userNameId" className="font-bold">
              نام کاربری
            </label>
            <input
              type="text"
              name="userName"
              id="userNameId"
              placeholder="نام کاربری خود را وارد نمایید"
              className="admin-panel-username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
            />
            {formik.touched.userName && formik.errors.userName && (
              <div className="text-red-500">{formik.errors.userName}</div>
            )}
          </div>
          {/* PASSWORD SECTION */}
          <div className="flex flex-col gap-3 relative">
            <label htmlFor="userNameId" className="font-bold">
              رمز عبور
            </label>
            <div className="relative admin-panel-password">
              <input
                type={isPasswordHidden ? "password" : "text"}
                name="password"
                id="passwordId"
                placeholder="رمز عبور خود را وارد نمایید"
                className="outline-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {visibleIcon}
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500">{formik.errors.password}</div>
            )}
          </div>
          <Button type="submit" classes={" self-center"}>
            ورود
          </Button>
        </form>
        {isUserForm && (
          <Link to="/add_user">
            <span className="text-violet-700 underline">
              حساب کاربری ندارید؟ ثبت نام کنید!
            </span>
          </Link>
        )}
        <BackButton
          classes={" self-end absolute bottom-3 left-3"}
          onClick={handleBackBtnClick}
        />
      </div>
    </div>
  );
}
