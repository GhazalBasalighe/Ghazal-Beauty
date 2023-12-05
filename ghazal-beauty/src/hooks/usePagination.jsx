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

        const formattedRows = await Promise.all(
          data.map(async (item) => {
            const category = await getInfoById(
              item.category,
              "categories"
            );
            const subCategory = await getInfoById(
              item.subcategory,
              "subcategories"
            );
            return formatRowsCallback(item, category, subCategory);
          })
        );
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

const getInfoById = async (id, apiEndpoint) => {
  try {
    const name = await axios.get(
      `http://localhost:8000/api/${apiEndpoint}/${id}`
    );
    const response = name.data.data;
    if (apiEndpoint === "categories") return response.category.name;
    else return response.subcategory.name;
  } catch (error) {
    console.error("Error fetching category name:", error);
    return "Unknown Category";
  }
};
