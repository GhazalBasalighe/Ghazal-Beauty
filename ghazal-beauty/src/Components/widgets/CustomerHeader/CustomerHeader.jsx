import { ShoppingCart, Fingerprint, User } from "@phosphor-icons/react";
import { Header } from "../../base";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { logout } from "../../../store/slices/authSlice";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export function CustomerHeader() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.auth.userName);
  const items = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  function onLogOut() {
    toast.success("با موفقیت خارج شدید", {
      position: "top-left",
      style: {
        padding: "10px",
        fontWeight: 700,
      },
    });
    dispatch(logout());
  }

  return (
    <Header>
      <Toaster />
      <NavLink to="/">
        <div className="vertical-flex gap-5">
          <img src="src/assets/Logo.png" width={45} />
          <span className="text-3xl">غزل بیوتی</span>
        </div>
      </NavLink>
      <div className="vertical-flex gap-10">
        {!isLoggedIn && (
          <NavLink to="user_login">
            <span className="costumer-header-btn">
              <User size={20} />
              <span>ورود / ثبت نام</span>
            </span>
          </NavLink>
        )}
        {isLoggedIn && (
          <span className="vertical-flex gap-1 text-gray-700 text-lg">
            <span
              onMouseOver={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="cursor-pointer"
            >
              سلام {userName} 👋
            </span>
            <div
              className={`vertical-flex justify-between w-28 p-2 rounded-lg cursor-pointer z-100 absolute top-12 bg-white ${
                isHovered ? "flex" : "hidden"
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onClick={onLogOut}
            >
              <span>خروج</span>
              <SignOut size={30} />
            </div>
          </span>
        )}
        <NavLink to="admin_login">
          <span className="costumer-header-btn">
            <Fingerprint size={20} />
            <span>مدیریت</span>
          </span>
        </NavLink>
        <NavLink to="cart">
          <span className="costumer-header-btn">
            {items.length > 0 && (
              <span className="cart-badge">{items.length}</span>
            )}
            <ShoppingCart size={20} />
            <span>سبد خرید</span>
          </span>
        </NavLink>
      </div>
    </Header>
  );
}
