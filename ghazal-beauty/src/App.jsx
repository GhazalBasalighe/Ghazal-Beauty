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
  Modal,
  OrdersModal,
  AddProductModal,
  TextEditor,
} from "./Components";
import { PaymentFailure, PaymentSuccess, Payment } from "./pages";
function App() {
  return (
    <>
      <AdminHeader />
      <OrdersManagement />
      <OrdersModal />
    </>
  );
}

export default App;
