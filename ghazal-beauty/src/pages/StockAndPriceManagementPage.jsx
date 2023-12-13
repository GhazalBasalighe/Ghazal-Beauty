import { StockAndPriceManagement, PrivateRoute } from "../Components";

export function StockAndPriceManagementPage() {
  return <StockAndPriceManagement />;
}

export default PrivateRoute(StockAndPriceManagementPage);
