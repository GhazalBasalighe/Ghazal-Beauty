import React from "react";
import { LoginForm } from "../../base";

export function AdminLoginForm() {
  return <LoginForm title="ورود به پنل مدیریت" isUserForm={false} />;
}
