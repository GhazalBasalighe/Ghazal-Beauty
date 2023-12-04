import { SignOut } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

export function BackButton({ classes = "", onClick }) {
  return (
    <NavLink to="/">
      <button
        className={"admin-header-back-btn" + classes}
        onClick={onClick}
      >
        <SignOut size={25} />
        <span> بازگشت به سایت</span>
      </button>
    </NavLink>
  );
}
