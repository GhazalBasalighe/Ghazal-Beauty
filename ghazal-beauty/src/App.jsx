import "./App.css";
import {
  CustomerHeader,
  AdminHeader,
  ProductContainer,
  AdminLoginForm,
  UserInfoForm,
  ProductDetails,
  Cart,
  ProductGroupPreview,
  ProductsManagement,
  StockAndPriceManagement,
  OrdersManagement,
} from "./Components";

import { PaymentFailure, PaymentSuccess, Payment } from "./pages";

function App() {
  return (
    <>
      <AdminHeader />
      <OrdersManagement />
    </>
  );
}

export default App;
