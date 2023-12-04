import { useState, useEffect } from "react";
import axios from "axios";
import toPersianDigits from "../helpers/toPersianDigits";

const usePagination = (initialPage, limit, apiEndpoint) => {
  const [tableData, setTableData] = useState({
    titles: ["کالا", "قیمت", "موجودی"],
    rows: [],
  });
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    totalPages: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiEndpoint}?page=${pagination.currentPage}&limit=${limit}`
        );
        const data = response.data.data.products;

        const formattedRows = data.map((item) => [
          item.name,
          toPersianDigits(item.price.toFixed(3)),
          toPersianDigits(item.quantity.toFixed(0)),
        ]);

        setTableData((prevTableData) => ({
          ...prevTableData,
          rows: formattedRows,
        }));

        setPagination((prevPagination) => ({
          ...prevPagination,
          totalPages: response.data.total_pages,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pagination.currentPage, limit, apiEndpoint]);

  const handlePageChange = (newPage) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: newPage,
    }));
  };

  return {
    tableData,
    pagination,
    handlePageChange,
  };
};

export default usePagination;
