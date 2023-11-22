import { SignOut } from "@phosphor-icons/react";

export function BackButton({ classes = "" }) {
  return (
    <button className={"admin-header-back-btn" + classes}>
      <SignOut size={25} />
      <span> بازگشت به سایت</span>
    </button>
  );
}
