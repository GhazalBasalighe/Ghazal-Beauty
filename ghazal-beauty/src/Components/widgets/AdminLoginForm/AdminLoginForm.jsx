import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";

export function AdminLoginForm() {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  function handlePasswordVisibility() {
    setIsPasswordHidden((isPasswordHidden) => !isPasswordHidden);
  }

  //  RENDER APPROPRIATE SVG ACCORDING TO PASSWORD VISIBILITY
  const visibleIcon = isPasswordHidden ? (
    <Eye
      size={24}
      className="absolute left-2 bottom-2 cursor-pointer"
      onClick={handlePasswordVisibility}
    />
  ) : (
    <EyeSlash
      size={24}
      className="absolute left-2 bottom-2 cursor-pointer"
      onClick={handlePasswordVisibility}
    />
  );

  return (
    <div className="grid place-items-center h-screen overflow-hidden">
      {/* BACKGROUND WAVE SVG */}
      <img
        src="src/assets/bgWave.png"
        alt="background"
        className=" -z-10 object-cover"
      />
      <div className="admin-panel-loginForm">
        <h1 className="admin-panel-title">ورود به پنل مدیریت</h1>
        <form className="flex flex-col gap-8">
          {/* USERNAME SECTION */}
          <div className="flex flex-col gap-3">
            <label htmlFor="userNameId" className="font-bold">
              نام کاربری
            </label>
            <input
              type="text"
              name="userName"
              id="userNameId"
              placeholder="نام کاربری خود را وارد نمایید"
              className="admin-panel-username"
            />
          </div>
          {/* PASSWORD SECTION */}
          <div className="flex flex-col gap-3 relative">
            <label htmlFor="userNameId" className="font-bold">
              رمز عبور
            </label>
            <input
              type={isPasswordHidden ? "password" : "text"}
              name="password"
              id="passwordId"
              placeholder="رمز عبور خود را وارد نمایید"
              className="admin-panel-password"
            />
            {visibleIcon}
          </div>
          <button
            type="submit"
            className="text-lg shadow-2xl bg-purple-500 text-white self-center py-1 px-8 rounded-lg hover:bg-purple-600 hover:scale-110 duration-300"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}
