import axios from "axios";
import { usePagination } from "../../../hooks/usePagination";
import { Pagination, Button, DynamicTable } from "../../base";
import { useState } from "react";

export function ProductsManagement() {
  const apiEndpoint = "http://localhost:8000/api/products";

  const formatRowsCallback = (item) => [
    <img
      src={`http://localhost:8000/images/products/images/products-images-default.jpeg`}
      alt="product image"
      width={60}
    />,
    item.name,
    item.category,
    <>
      <span className="underline cursor-pointer text-indigo-500">
        ویرایش
      </span>
      <span className="underline cursor-pointer text-indigo-500">حذف</span>
    </>,
  ];

  const { tableData, pagination, handlePageChange } = usePagination(
    1,
    4,
    apiEndpoint,
    formatRowsCallback,
    ["تصویر محصول", "نام محصول", "دسته بندی", "عملیات های مربوطه"]
  );
  console.log(tableData);

  return (
    <div className="flex flex-col justify-center px-20 py-8 gap-8 mt-10">
      <div className="vertical-flex justify-between">
        <h1 className="text-4xl">مدیریت کالا</h1>
        <Button>افزودن کالا</Button>
      </div>
      <DynamicTable titles={tableData.titles} rows={tableData.rows} />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
