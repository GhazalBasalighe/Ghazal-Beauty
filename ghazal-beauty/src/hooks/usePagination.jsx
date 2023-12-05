import { useState, useEffect } from "react";
import axios from "axios";

export const usePagination = (
  initialPage,
  limit,
  apiEndpoint,
  formatRowsCallback,
  titles
) => {
  const [tableData, setTableData] = useState({
    titles: titles,
    rows: [],
  });
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    totalPages: 1,
  });

  useEffect(() => {
    //GET DATA PAGE BY PAGE
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiEndpoint}?page=${pagination.currentPage}&limit=${limit}`
        );
        const data = response.data.data.products;
        console.log(data);
        const formattedRows = data.map(formatRowsCallback);

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
  }, [pagination.currentPage, limit, apiEndpoint, formatRowsCallback]);

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
