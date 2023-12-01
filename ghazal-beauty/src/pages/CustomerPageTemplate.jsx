import { Outlet } from "react-router-dom";
import { CustomerHeader } from "../Components";

function CustomerPageTemplate() {
  return (
    <>
      <CustomerHeader />
      <Outlet />
    </>
  );
}

export default CustomerPageTemplate;
