import { useRequest } from "../../../hooks/useRequest";
import { Pagination, DynamicTable, EmptyTable } from "../../base";
import toPersianDigits from "../../../helpers/toPersianDigits";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { useModal } from "../../../hooks/useModal";
import { NotePencil } from "@phosphor-icons/react";
import { EditProductModal } from "../EditProductModal";
import { createPortal } from "react-dom";
import { useState } from "react";

export function StockAndPriceManagement() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleClick = (product) => {
    setSelectedProduct(product);
    openModal("editPrice");
  };
  const formatRowsCallback = (item) => [
    item.name,
    <span>{toPersianDigits(item.price.toFixed(3))}</span>,
    <span>{toPersianDigits(item.quantity.toFixed(0))}</span>,
    <NotePencil
      size={20}
      weight="bold"
      className="cursor-pointer text-purple-900"
      onClick={() => handleClick(item)}
    />,
  ];

  const { tableData, pagination, handlePageChange } = useRequest(
    1,
    7,
    "/products",
    formatRowsCallback,
    ["کالا", "قیمت", "موجودی", "ویرایش"]
  );

  const isLoading = useSelector((state) => state.auth.isLoading);

  return (
    <div className="flex flex-col justify-center px-20 py-8 gap-8 mt-10">
      <h1 className="text-4xl">مدیریت موجودی و قیمت‌ها</h1>
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
      {isModalOpen("editPrice") &&
        createPortal(
          <EditProductModal
            productInfo={selectedProduct}
            closeModal={() => closeModal("editPrice")}
          />,
          document.body
        )}
    </div>
  );
}
