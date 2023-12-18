import { useSelector } from "react-redux";
import { usePagination } from "../../../hooks/usePagination";
import { Pagination, Button, DynamicTable, EmptyTable } from "../../base";
import { SyncLoader } from "react-spinners";
import { useModal } from "../../../hooks/useModal";
import { createPortal } from "react-dom";
import { AddProductModal } from "../AddProductModal";
import { DeleteProductModal } from "../DeleteProductModal";
import { useState } from "react";
export function ProductsManagement() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleEditClick = (product) => {
    setSelectedProduct(product._id);
    openModal("edit");
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    openModal("delete");
  };
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
        <span
          className="underline cursor-pointer text-indigo-500"
          onClick={() => handleEditClick(item)}
        >
          ویرایش
        </span>
        <span
          className="underline cursor-pointer text-indigo-500"
          onClick={() => handleDeleteClick(item)}
        >
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
        <Button onClick={() => openModal("add")}>افزودن کالا</Button>
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
      {/* ADD PRODUCT MODAL */}
      {isModalOpen("add") &&
        createPortal(
          <AddProductModal closeModal={() => closeModal("add")} />,
          document.body
        )}
      {/* DELETE PRODUCT MODAL */}
      {isModalOpen("delete") &&
        createPortal(
          <DeleteProductModal
            closeModal={() => closeModal("delete")}
            productInfo={selectedProduct}
          />,
          document.body
        )}
      {/* EDIT MODAL PRODUCT */}
      {isModalOpen("edit") &&
        createPortal(
          <AddProductModal
            closeModal={() => closeModal("edit")}
            productId={selectedProduct}
          />,
          document.body
        )}
    </div>
  );
}
