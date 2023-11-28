import toPersianDigits from "../../../helpers/toPersianDigits";
import { Button, DynamicTable } from "../../base";

export function StockAndPriceManagement() {
  const tableData = {
    titles: ["کالا", "قیمت", "موجودی"],
    rows: [
      ["شوینده صورت", toPersianDigits("200.000"), toPersianDigits("5")],
      ["نمیدونم", toPersianDigits("100.000"), toPersianDigits("10")],
      ["میدونم", toPersianDigits("800.000"), toPersianDigits("8")],
    ],
  };

  return (
    <div className="flex flex-col justify-center px-12 py-8 gap-8">
      <div className="vertical-flex justify-between">
        <h1 className="text-4xl">مدیریت موجودی و قیمت‌ها</h1>
        <Button>ذخیره</Button>
      </div>
      <DynamicTable titles={tableData.titles} rows={tableData.rows} />
    </div>
  );
}
