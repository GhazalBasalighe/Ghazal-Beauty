import { usePagination } from "../../../hooks/usePagination";
import { Pagination, Button, DynamicTable, EmptyTable } from "../../base";
import toPersianDigits from "../../../helpers/toPersianDigits";

export function StockAndPriceManagement() {
  const apiEndpoint = "http://localhost:8000/api/products";

  const formatRowsCallback = (item) => [
    item.name,
    toPersianDigits(item.price.toFixed(3)),
    toPersianDigits(item.quantity.toFixed(0)),
  ];

  const { tableData, pagination, handlePageChange } = usePagination(
    1,
    7,
    apiEndpoint,
    formatRowsCallback,
    ["کالا", "قیمت", "موجودی"]
  );
  console.log(tableData);

  return (
    <div className="flex flex-col justify-center px-20 py-8 gap-8 mt-10">
      <div className="vertical-flex justify-between">
        <h1 className="text-4xl">مدیریت موجودی و قیمت‌ها</h1>
        <Button>ذخیره</Button>
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
