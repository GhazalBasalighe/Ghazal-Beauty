import { ShoppingCart, Fingerprint, User } from "@phosphor-icons/react";
import { Header } from "../../base";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
export function CustomerHeader() {
  const items = useSelector((state) => state.cart.items);
  return (
    <Header>
      <NavLink to="/">
        <div className="vertical-flex gap-5">
          <img src="src/assets/Logo.png" width={45} />
          <span className="text-3xl">غزل بیوتی</span>
        </div>
      </NavLink>
      <div className="vertical-flex gap-10">
        <NavLink to="user_login">
          <span className="costumer-header-btn">
            <User size={20} />
            <span>ورود / ثبت نام</span>
          </span>
        </NavLink>
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
