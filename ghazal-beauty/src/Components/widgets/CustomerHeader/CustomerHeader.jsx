import { ShoppingCart, Fingerprint } from "@phosphor-icons/react";
import { Header } from "../../base";

export function CustomerHeader() {
  return (
    <Header>
      <div className="vertical-flex gap-5">
        <img src="src/assets/Logo.png" width={45} />
        <span className="text-3xl">غزل بیوتی</span>
      </div>
      <div className="vertical-flex gap-10">
        <span className="costumer-header-btn">
          <Fingerprint size={20} />
          <span>مدیریت</span>
        </span>
        <span className="costumer-header-btn">
          <ShoppingCart size={20} />
          <span>سبد خرید</span>
        </span>
      </div>
    </Header>
  );
}
