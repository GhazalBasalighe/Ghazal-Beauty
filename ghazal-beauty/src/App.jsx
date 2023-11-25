import "./App.css";
import {
  CustomerHeader,
  AdminHeader,
  ProductContainer,
  AdminLoginForm,
  UserInfoForm,
  ProductDetails,
  Cart,
} from "./Components";

import { PaymentFailure, PaymentSuccess } from "./pages";

function App() {
  return (
    <>
      <CustomerHeader />
      <Cart />
    </>
  );
}

export default App;
