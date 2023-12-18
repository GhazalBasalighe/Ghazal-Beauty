import { useSelector } from "react-redux";
import { usePagination } from "../../../hooks/usePagination";
import { Pagination, Button, DynamicTable, EmptyTable } from "../../base";
import { SyncLoader } from "react-spinners";
import { useModal } from "../../../hooks/useModal";
import { createPortal } from "react-dom";
import { AddProductModal } from "../AddProductModal";

export function ProductsManagement() {
  const { isModalOpen, openModal, closeModal } = useModal();

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
    "/products",
    formatRowsCallback,
    ["تصویر محصول", "نام محصول", "دسته بندی", "عملیات های مربوطه"]
  );
  const isLoading = useSelector((state) => state.auth.isLoading);

  return (
    <div className="flex flex-col justify-center px-20 py-8 gap-8 mt-4">
      <div className="vertical-flex justify-between">
        <h1 className="text-4xl">مدیریت کالا</h1>
        <Button onClick={openModal}>افزودن کالا</Button>
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
      {isModalOpen &&
        createPortal(
          <AddProductModal closeModal={closeModal} />,
          document.body
        )}
    </div>
  );
}
