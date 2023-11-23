import "./App.css";
import {
  CustomerHeader,
  AdminHeader,
  ProductContainer,
  AdminLoginForm,
  UserInfoForm,
  ProductDetails,
} from "./Components";

import { PaymentFailure, PaymentSuccess } from "./pages";

function App() {
  return (
    <>
      <CustomerHeader />
      <ProductDetails />
    </>
  );
}

export default App;
