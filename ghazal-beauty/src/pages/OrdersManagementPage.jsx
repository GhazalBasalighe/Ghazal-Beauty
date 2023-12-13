import { OrdersManagement, PrivateRoute } from "../Components";

function OrdersManagementPage() {
  return <OrdersManagement />;
}

export default PrivateRoute(OrdersManagementPage);
