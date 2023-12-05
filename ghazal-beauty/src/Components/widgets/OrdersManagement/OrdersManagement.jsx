import toPersianDigits from "../../../helpers/toPersianDigits";
import { DynamicTable, Pagination } from "../../base";
import { Checkbox } from "./Checkbox";
import { usePagination } from "../../../hooks/usePagination";

export function OrdersManagement() {
  const apiEndpoint = "http://localhost:8000/api/orders";

  const formatRowsCallback = async (order, user) => {
    return [
      user,
      toPersianDigits(order.totalPrice.toFixed(3).toString()),
      toPersianDigits(
        new Date(order.deliveryDate)
          .toLocaleTimeString("fa-IR", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
          .toString()
      ),
      <span>
        {order.deliveryStatus ? "تحویل داده شده" : "در انتظار تحویل"}
      </span>,
      <span className="underline cursor-pointer text-indigo-500">
        بررسی سفارش
      </span>,
    ];
  };

  const { tableData, pagination, handlePageChange } = usePagination(
    1,
    4,
    apiEndpoint,
    formatRowsCallback,
    [
      "نام کاربر",
      "مجموع مبلغ",
      "زمان ثبت سفارش",
      "وضعیت تحویل",
      "عملیات‌های مربوطه",
    ]
  );

  return (
    <div className="flex flex-col justify-center px-20 py-8 gap-8 mt-10">
      <div className="vertical-flex justify-between">
        <h1 className="text-4xl">مدیریت سفارش‌ها</h1>
        <Checkbox />
      </div>
      <DynamicTable titles={tableData.titles} rows={tableData.rows} />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
