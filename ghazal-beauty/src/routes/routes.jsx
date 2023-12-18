import React from "react";
import { createBrowserRouter } from "react-router-dom";

// IMPORTING PAGE TEMPLATES
const AdminPageTemplate = React.lazy(() =>
  import("../pages/AdminPageTemplate")
);
const CustomerPageTemplate = React.lazy(() =>
  import("../pages/CustomerPageTemplate")
);

//IMPORTING USER SIDE PAGES
const ProductsPage = React.lazy(() => import("../pages/ProductsPage"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const SubGroupProductsPage = React.lazy(() =>
  import("../pages/SubGroupProductsPage")
);
const ProductDetailsPage = React.lazy(() =>
  import("../pages/ProductDetailsPage")
);
const PaymentSuccess = React.lazy(() => import("../pages/PaymentSuccess"));
const PaymentFailure = React.lazy(() => import("../pages/PaymentFailure"));
const Payment = React.lazy(() => import("../pages/Payment"));
const CartPage = React.lazy(() => import("../pages/Cart"));

// IMPORTING ADMIN SIDE PAGES
const OrdersManagementPage = React.lazy(() =>
  import("../pages/OrdersManagementPage")
);
const ProductManagementPage = React.lazy(() =>
  import("../pages/ProductManagementPage")
);
const StockAndPriceManagementPage = React.lazy(() =>
  import("../pages/StockAndPriceManagementPage")
);
const ConfirmPurchase = React.lazy(() =>
  import("../pages/ConfirmPurchase")
);

// IMPORTING LOGIN PAGES
const AdminLogin = React.lazy(() => import("../pages/AdminLogin"));

const router = createBrowserRouter([
  // CUSTOMER SIDE
  {
    path: "/",
    element: <CustomerPageTemplate />,
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
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "confirm_purchase",
        element: <ConfirmPurchase />,
      },
    ],
  },
  //   ADMIN SIDE
  {
    path: "/admin",
    element: <AdminPageTemplate />,
    errorElement: <NotFound />,
    children: [
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
  //   ADMIN LOGIN
  {
    path: "admin_login",
    element: <AdminLogin />,
    errorElement: <NotFound />,
  },
]);

export { router };
