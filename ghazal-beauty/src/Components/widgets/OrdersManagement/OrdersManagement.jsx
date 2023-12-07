import toPersianDigits from "../../../helpers/toPersianDigits";
import { DynamicTable, Pagination, EmptyTable } from "../../base";
import { Checkbox } from "./Checkbox";
import { usePagination } from "../../../hooks/usePagination";

export function OrdersManagement() {
  const apiEndpoint = "http://localhost:8000/api/orders";

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
      <span className="underline cursor-pointer text-indigo-500">
        بررسی سفارش
      </span>
    );

    return [user, price, date, deliveryStatus, operations];
  };

  const { tableData, pagination, handlePageChange } = usePagination(
    1,
    7,
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
      {tableData.rows.length === 0 ? (
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
    </div>
  );
}
