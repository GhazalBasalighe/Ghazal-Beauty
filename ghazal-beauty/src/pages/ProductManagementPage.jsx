import { ProductsManagement, PrivateRoute } from "../Components";

function ProductManagementPage() {
  return <ProductsManagement />;
}

export default PrivateRoute(ProductManagementPage);
