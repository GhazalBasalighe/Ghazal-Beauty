import { DynamicTable, Pagination, EmptyTable } from "../../base";
import { OrdersModal } from "../../widgets";
import { Checkbox } from "./Checkbox";
import { useRequest } from "../../../hooks/useRequest";
import { SyncLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useModal } from "../../../hooks/useModal";
import { createPortal } from "react-dom";
import { useState } from "react";

export function OrdersManagement() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [selectedOrder, setSelectedOrder] = useState(null);

  function handleClick(order) {
    setSelectedOrder(order);
    openModal("orders");
  }

  const formatRowsCallback = (order) => {
    // format each property separately for better readability
    const user = [order.user.firstname, order.user.lastname].join(" ");

    const date = new Date(order.deliveryDate).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const price = order.totalPrice.toLocaleString("fa-IR");
    const deliveryStatus = (
      <span>
        {order.deliveryStatus ? "تحویل داده شده" : "در انتظار تحویل"}
      </span>
    );
    const operations = (
      <span
        className="underline cursor-pointer text-indigo-500"
        onClick={() => handleClick(order)}
      >
        بررسی سفارش
      </span>
    );
    return [user, price, date, deliveryStatus, operations];
  };

  const { tableData, pagination, handlePageChange } = useRequest(
    1,
    7,
    "/orders",
    formatRowsCallback,
    [
      "نام کاربر",
      "مجموع مبلغ",
      "زمان ثبت سفارش",
      "وضعیت تحویل",
      "عملیات‌های مربوطه",
    ]
  );

  const isLoading = useSelector((state) => state.auth.isLoading);
  return (
    <div className="flex flex-col justify-center px-20 py-8 gap-8 mt-10">
      <div className="vertical-flex justify-between">
        <h1 className="text-4xl">مدیریت سفارش‌ها</h1>
        <Checkbox />
      </div>
      {isLoading && (
        <SyncLoader
          color="#a056b9"
          className="fixed top-1/2 left-1/2 bg-white"
        />
      )}
      {tableData.rows.length === 0 && !isLoading ? (
        <EmptyTable />
      ) : (
        <>
          <DynamicTable titles={tableData.titles} rows={tableData.rows} />
          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {isModalOpen("orders") &&
        createPortal(
          <OrdersModal
            closeModal={() => closeModal("orders")}
            selectedOrder={selectedOrder}
          />,
          document.body
        )}
    </div>
  );
}
