import { usePagination } from "../../../hooks/usePagination";
import { Pagination, Button, DynamicTable, EmptyTable } from "../../base";
import toPersianDigits from "../../../helpers/toPersianDigits";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";

export function StockAndPriceManagement() {
  const formatRowsCallback = (item) => [
    item.name,
    toPersianDigits(item.price.toFixed(3)),
    toPersianDigits(item.quantity.toFixed(0)),
  ];

  const { tableData, pagination, handlePageChange } = usePagination(
    1,
    7,
    "/products",
    formatRowsCallback,
    ["کالا", "قیمت", "موجودی"]
  );

  const isLoading = useSelector((state) => state.auth.isLoading);

  return (
    <div className="flex flex-col justify-center px-20 py-8 gap-8 mt-10">
      <div className="vertical-flex justify-between">
        <h1 className="text-4xl">مدیریت موجودی و قیمت‌ها</h1>
        <Button>ذخیره</Button>
      </div>
      {isLoading && (
        <SyncLoader color="#a056b9" className="fixed top-1/2 left-1/2" />
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
    </div>
  );
}
