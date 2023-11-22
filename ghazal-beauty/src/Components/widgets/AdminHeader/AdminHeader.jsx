import { Header } from "../../base";
import { SignOut, ShoppingBag, Tag, Package } from "@phosphor-icons/react";

export function AdminHeader() {
  return (
    <Header>
      <div className="vertical-flex gap-5">
        <img src="src/assets/Logo.svg" width={45} />
        <span className="text-3xl">مدیریت فروشگاه غزل بیوتی</span>
      </div>
      <div className="vertical-flex gap-40">
        <ul className="vertical-flex gap-5">
          <li className="admin-header-li vertical-flex gap-2">
            <Package size={24} />
            <span>کالاها</span>
          </li>
          <li className="admin-header-li vertical-flex gap-2">
            <Tag size={24} />
            <span>موجودی و قیمت‌ها</span>
          </li>
          <li className="admin-header-li vertical-flex gap-2">
            <ShoppingBag size={24} />
            <span>سفارش‌ها</span>
          </li>
        </ul>
        <button className="admin-header-back-btn">
          <SignOut size={25} />
          <span> بازگشت به سایت</span>
        </button>
      </div>
    </Header>
  );
}
