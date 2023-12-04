import { SignOut } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

export function BackButton({ classes = "" }) {
  return (
    <NavLink to="/">
      <button className={"admin-header-back-btn" + classes}>
        <SignOut size={25} />
        <span> بازگشت به سایت</span>
      </button>
    </NavLink>
  );
}
