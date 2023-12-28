import React from "react";
import { LoginForm } from "../../base";

export function CustomerLoginForm() {
  return (
    <LoginForm
      title="ورود به پنل کاربری"
      redirectTo="/"
      isUserForm={true}
    />
  );
}
