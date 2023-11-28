import toPersianDigits from "../../../helpers/toPersianDigits";
import { DynamicTable } from "../../base";
import { Checkbox } from "../Checkbox";
export function OrdersManagement() {
  const tableData = {
    titles: [
      "نام کاربر",
      "مجموع مبلغ",
      "زمان ثبت سفارش",
      "عملیات‌های مربوطه",
    ],
    rows: [
      [
        "اکبر زمانی",
        toPersianDigits("200.000"),
        toPersianDigits("1401/2/04"),
        <td className="p-3 align-middle underline cursor-pointer text-indigo-500">
          بررسی سفارش
        </td>,
      ],
      [
        "اکبر زمانی",
        toPersianDigits("200.000"),
        toPersianDigits("1401/2/04"),
        <td className="p-3 align-middle underline cursor-pointer text-indigo-500">
          بررسی سفارش
        </td>,
      ],
      [
        "اکبر زمانی",
        toPersianDigits("200.000"),
        toPersianDigits("1401/2/04"),
        <td className="p-3 align-middle underline cursor-pointer text-indigo-500">
          بررسی سفارش
        </td>,
      ],
      [
        "اکبر زمانی",
        toPersianDigits("200.000"),
        toPersianDigits("1401/2/04"),
        <td className="p-3 align-middle underline cursor-pointer text-indigo-500">
          بررسی سفارش
        </td>,
      ],
    ],
  };

  return (
    <div className="flex flex-col justify-center px-12 py-8 gap-8">
      <div className="vertical-flex justify-between">
        <h1 className="text-4xl">مدیریت سفارش‌ها</h1>
        <Checkbox />
      </div>
      <DynamicTable titles={tableData.titles} rows={tableData.rows} />
    </div>
  );
}
