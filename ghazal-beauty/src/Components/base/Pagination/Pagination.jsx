import {
  CaretCircleDoubleLeft,
  CaretCircleDoubleRight,
} from "@phosphor-icons/react";
import toPersianDigits from "../../../helpers/toPersianDigits";

export const Pagination = ({ pagination, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="text-center fixed bottom-8 left-1/2 -translate-x-1/2 vertical-flex gap-2 bg-purple-100 p-3 rounded-lg font-bold">
      <button onClick={() => handlePageChange(pagination.currentPage + 1)}>
        <CaretCircleDoubleRight
          size={30}
          className="bg-purple-300 rounded-full"
          weight="light"
        />
      </button>
      <span>{`صفحه ${toPersianDigits(
        pagination.currentPage.toString()
      )} از ${toPersianDigits(pagination.totalPages.toString())}`}</span>
      <button onClick={() => handlePageChange(pagination.currentPage - 1)}>
        <CaretCircleDoubleLeft
          size={30}
          className="bg-purple-300 rounded-full"
          weight="light"
        />
      </button>
    </div>
  );
};