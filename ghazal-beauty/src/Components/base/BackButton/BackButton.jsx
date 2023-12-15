import { SignOut } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../../store/slices/authSlice";

export function BackButton({ classes = "" }) {
  const dispatch = useDispatch();
  return (
    <NavLink to="/">
      <button
        className={"admin-header-back-btn" + classes}
        onClick={() => dispatch(logout())}
      >
        <SignOut size={25} />
        <span> بازگشت به سایت</span>
      </button>
    </NavLink>
  );
}
