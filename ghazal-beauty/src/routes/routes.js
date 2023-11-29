import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AdminLogin,
  CartPage,
  NotFound,
  OrdersManagementPage,
  Payment,
  PaymentFailure,
  PaymentSuccess,
  ProductDetailsPage,
  ProductManagementPage,
  ProductsPage,
  StockAndPriceManagementPage,
  SubGroupProductsPage,
} from "../pages";

export function appRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />}>
          <Route path="products" element={<SubGroupProductsPage />} />
          <Route
            path="products/:groupId/:subgroupId/:productId"
            element={<ProductDetailsPage />}
          />
          <Route path="successful_payment" element={<PaymentSuccess />} />
          <Route
            path="unsuccessful_payment"
            element={<PaymentFailure />}
          />
          <Route path="mock_payment" element={<Payment />} />
          <Route path="admin_login" element={<AdminLogin />} />
          <Route path="cart" element={<CartPage />} />
          <Route
            path="product_manage"
            element={<ProductManagementPage />}
          />
          <Route
            path="stock_price_manage"
            element={<StockAndPriceManagementPage />}
          />
          <Route path="orders_manage" element={<OrdersManagementPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
