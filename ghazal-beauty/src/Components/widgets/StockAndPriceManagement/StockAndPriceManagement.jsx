import { Button, DynamicTable, Pagination } from "../../base";
import usePagination from "../../../hooks/usePagination";

export function StockAndPriceManagement() {
  const { tableData, pagination, handlePageChange } = usePagination(
    1,
    7,
    "http://localhost:8000/api/products"
  );

  return (
    <div className="flex flex-col justify-center px-20 py-8 gap-8 mt-10">
      <div className="vertical-flex justify-between">
        <h1 className="text-4xl">مدیریت موجودی و قیمت‌ها</h1>
        <Button>ذخیره</Button>
      </div>
      <DynamicTable titles={tableData.titles} rows={tableData.rows} />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
