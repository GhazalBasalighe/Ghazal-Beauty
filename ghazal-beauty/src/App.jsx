import "./App.css";
import { RouterProvider } from "react-router-dom";
import React, { Suspense } from "react";
import { router } from "./routes/routes";
import { SyncLoader } from "react-spinners";

function App() {
  return (
    <Suspense
      fallback={
        <SyncLoader color="#a056b9" className="fixed top-1/2 left-1/2" />
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
