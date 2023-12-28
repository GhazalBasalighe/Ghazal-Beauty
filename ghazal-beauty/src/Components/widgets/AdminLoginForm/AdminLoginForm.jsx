import React from "react";
import { LoginForm } from "../../base";

export function AdminLoginForm() {
  return (
    <LoginForm
      title="ورود به پنل مدیریت"
      redirectTo="/admin/stock_price_manage"
      isUserForm={false}
    />
  );
}
