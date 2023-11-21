import { ShoppingCart, Fingerprint } from "@phosphor-icons/react";
import { Header } from "../../Header";

export function CustomerHeader() {
  return (
    <Header>
      <div className="vertical-flex">
        <img src="src/assets/Logo.svg" width={45} />
        <span className="text-3xl">غزل بیوتی</span>
      </div>
      <div className="vertical-flex gap-10">
        <span className="vertical-flex gap-1 text-gray-700">
          <Fingerprint size={20} />
          <span>مدیریت</span>
        </span>
        <span className="vertical-flex gap-1 text-gray-700">
          <ShoppingCart size={20} />
          <span>سبد خرید</span>
        </span>
      </div>
    </Header>
  );
}
