import { ShoppingCart, Fingerprint } from "@phosphor-icons/react";
import { Header } from "../../Header";

export function CustomerHeader() {
  return (
    <Header>
      <div className="vertical-flex gap-5">
        <img src="src/assets/Logo.svg" width={45} />
        <span className="text-3xl">غزل بیوتی</span>
      </div>
      <div className="vertical-flex gap-10">
        <span className="costumer-header-btn">
          <Fingerprint size={20} />
          <span>مدیریت</span>
        </span>
        <span className="vertical-flex gap-1 text-gray-700 text-lg cursor-pointer hover:border-solid hover:border-b-2 hover:border-indigo-400">
          <ShoppingCart size={20} />
          <span>سبد خرید</span>
        </span>
      </div>
    </Header>
  );
}
