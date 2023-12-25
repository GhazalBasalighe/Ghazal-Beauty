import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";
import { Button, BackButton } from "../../base";
import { validationSchema } from "../../../utils";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../store/thunk/thunk";
import { useNavigate } from "react-router-dom";

export function AdminLoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  function handlePasswordVisibility() {
    setIsPasswordHidden((isPasswordHidden) => !isPasswordHidden);
  }
  //  RENDER APPROPRIATE SVG ACCORDING TO PASSWORD VISIBILITY
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
    onSubmit: async (values) => {
      try {
        const { userName, password } = values;
        const response = await dispatch(
          loginUser({ username: userName, password })
        );
        console.log(response.payload);
        if (response.payload.status === "success") {
          toast.success(`سلام ${userName} 👋`, {
            position: "top-left",
            style: {
              padding: "10px",
              fontWeight: 700,
            },
          });
          // Redirect or perform other actions as needed
          setTimeout(() => {
            navigate("/admin/stock_price_manage");
          }, 1500);
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
    },
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
        <h1 className="admin-panel-title">ورود به پنل مدیریت</h1>
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
        <BackButton
          classes={" self-end absolute bottom-3 left-3"}
          onClick={handleBackBtnClick}
        />
      </div>
    </div>
  );
}
