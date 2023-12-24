import toPersianDigits from "../../../helpers/toPersianDigits";
import { DynamicTable, Pagination, EmptyTable } from "../../base";
import { OrdersModal } from "../../widgets";
import { Checkbox } from "./Checkbox";
import { usePagination } from "../../../hooks/usePagination";
import { SyncLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useModal } from "../../../hooks/useModal";
import { createPortal } from "react-dom";

export function OrdersManagement() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const formatRowsCallback = async (order, user) => {
    // format each property separately for better readability
    const date = toPersianDigits(
      new Date(order.deliveryDate).toLocaleDateString("fa-IR").toString()
    );
    const price = toPersianDigits(order.totalPrice.toFixed(3).toString());
    const deliveryStatus = (
      <span>
        {order.deliveryStatus ? "تحویل داده شده" : "در انتظار تحویل"}
      </span>
    );
    const operations = (
      <span
        className="underline cursor-pointer text-indigo-500"
        onClick={() => openModal("orders")}
      >
        بررسی سفارش
      </span>
    );

    return [user, price, date, deliveryStatus, operations];
  };

  const { tableData, pagination, handlePageChange } = usePagination(
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
          <OrdersModal closeModal={() => closeModal("orders")} />,
          document.body
        )}
    </div>
  );
}
