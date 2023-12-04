import { Header } from "../../base";
import { ShoppingBag, Tag, Package } from "@phosphor-icons/react";
import { BackButton } from "../../base";
import { NavLink } from "react-router-dom";

export function AdminHeader() {
  return (
    <Header>
      <div className="vertical-flex gap-5">
        <img src="src/assets/Logo.svg" width={45} />
        <span className="text-3xl">مدیریت فروشگاه غزل بیوتی</span>
      </div>
      <div className="vertical-flex gap-40">
        <ul className="vertical-flex gap-5">
          <NavLink to="product_manage">
            <li className="admin-header-li vertical-flex gap-2">
              <Package size={24} />
              <span>کالاها</span>
            </li>
          </NavLink>
          <NavLink to="stock_price_manage">
            <li className="admin-header-li vertical-flex gap-2">
              <Tag size={24} />
              <span>موجودی و قیمت‌ها</span>
            </li>
          </NavLink>
          <NavLink to="orders_manage">
            <li className="admin-header-li vertical-flex gap-2">
              <ShoppingBag size={24} />
              <span>سفارش‌ها</span>
            </li>
          </NavLink>
        </ul>
        <BackButton />
      </div>
    </Header>
  );
}
