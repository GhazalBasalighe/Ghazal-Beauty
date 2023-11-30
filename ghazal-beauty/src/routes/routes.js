// IDK WHY WHEN I TRY TO MODULARIZE THE CODE AND SEPERATE THE ROUTES , IT DOES NOT WORK !
// I KEEP GETTING Uncaught SyntaxError: expected expression, got '<' on line 23

// import React from "react";
// import ReactDOM from "react-dom";
// import { createBrowserRouter } from "react-router-dom";

// import { PageTemplate } from "../pages/PageTemplate";
// import { NotFound } from "../pages/NotFound";
// import { SubGroupProductsPage } from "../pages/SubGroupProductsPage";
// import { ProductDetailsPage } from "../pages/ProductDetailsPage";
// import { PaymentSuccess } from "../pages/PaymentSuccess";
// import { Payment } from "../pages/Payment";
// import { AdminLogin } from "../pages/AdminLogin";
// import { CartPage } from "../pages/Cart";
// import { OrdersManagementPage } from "../pages/OrdersManagementPage";
// import { ProductManagementPage } from "../pages/ProductManagementPage";
// import { StockAndPriceManagementPage } from "../pages/StockAndPriceManagementPage";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <PageTemplate />,
//     errorElement: <NotFound />,
//     children: [
//       { index: true, element: <ProductsPage /> },
//       {
//         path: "products/:",
//         element: <SubGroupProductsPage />,
//       },
//       {
//         path: "products/:productId",
//         element: <ProductDetailsPage />,
//       },
//       {
//         path: "successful_payment",
//         element: <PaymentSuccess />,
//       },
//       {
//         path: "unsuccessful_payment",
//         element: <PaymentFailure />,
//       },
//       {
//         path: "mock_payment",
//         element: <Payment />,
//       },
//       {
//         path: "admin_login",
//         element: <AdminLogin />,
//       },
//       {
//         path: "cart",
//         element: <CartPage />,
//       },
//       {
//         path: "product_manage",
//         element: <ProductManagementPage />,
//       },
//       {
//         path: "stock_price_manage",
//         element: <StockAndPriceManagementPage />,
//       },
//       {
//         path: "orders_manage",
//         element: <OrdersManagementPage />,
//       },
//     ],
//   },
// ]);
