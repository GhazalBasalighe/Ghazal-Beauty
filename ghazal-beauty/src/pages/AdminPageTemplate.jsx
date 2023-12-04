import { Outlet } from "react-router-dom";
import { AdminHeader } from "../Components";

function AdminPageTemplate() {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
}

export default AdminPageTemplate;
