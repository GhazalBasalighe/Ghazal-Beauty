import { usePagination } from "../../../hooks/usePagination";
import { Pagination, Button, DynamicTable, EmptyTable } from "../../base";

export function ProductsManagement() {
  const apiEndpoint = "http://localhost:8000/api/products";

  const formatRowsCallback = async (item, category, subCategory) => {
    // format each property separately for better readability
    const picture = (
      <img
        src={`http://localhost:8000/images/products/thumbnails/${item.thumbnail}`}
        alt="product image"
        width={65}
        className="rounded-lg"
      />
    );
    const groupings = (
      <span>
        {category} - {subCategory}
      </span>
    );
    const operations = (
      <>
        <span className="underline cursor-pointer text-indigo-500">
          ویرایش
        </span>
        <span className="underline cursor-pointer text-indigo-500">
          حذف
        </span>
      </>
    );
    return [picture, item.name, groupings, operations];
  };

  const { tableData, pagination, handlePageChange } = usePagination(
    1,
    4,
    apiEndpoint,
    formatRowsCallback,
    ["تصویر محصول", "نام محصول", "دسته بندی", "عملیات های مربوطه"]
  );

  return (
    <div className="flex flex-col justify-center px-20 py-8 gap-8 mt-4">
      <div className="vertical-flex justify-between">
        <h1 className="text-4xl">مدیریت کالا</h1>
        <Button>افزودن کالا</Button>
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
