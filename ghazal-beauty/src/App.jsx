import "./App.css";
import { RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter } from "react-router-dom";

import { PageTemplate } from "./pages/PageTemplate";
import { NotFound } from "./pages/NotFound";
import { ProductsPage } from "./pages/ProductsPage";
import { SubGroupProductsPage } from "./pages/SubGroupProductsPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { Payment } from "./pages/Payment";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { PaymentFailure } from "./pages/PaymentFailure";
import { AdminLogin } from "./pages/AdminLogin";
import { CartPage } from "./pages/Cart";
import { OrdersManagementPage } from "./pages/OrdersManagementPage";
import { ProductManagementPage } from "./pages/ProductManagementPage";
import { StockAndPriceManagementPage } from "./pages/StockAndPriceManagementPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageTemplate />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <ProductsPage /> },
        {
          path: "products/:subgroup",
          element: <SubGroupProductsPage />,
        },
        {
          path: "products/:productId",
          element: <ProductDetailsPage />,
        },
        {
          path: "successful_payment",
          element: <PaymentSuccess />,
        },
        {
          path: "unsuccessful_payment",
          element: <PaymentFailure />,
        },
        {
          path: "mock_payment",
          element: <Payment />,
        },
        {
          path: "admin_login",
          element: <AdminLogin />,
        },
        {
          path: "cart",
          element: <CartPage />,
        },
        {
          path: "product_manage",
          element: <ProductManagementPage />,
        },
        {
          path: "stock_price_manage",
          element: <StockAndPriceManagementPage />,
        },
        {
          path: "orders_manage",
          element: <OrdersManagementPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
