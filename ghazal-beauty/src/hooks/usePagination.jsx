import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useCheckboxContext } from "../context/checkboxContext";

export function usePagination(
  initialPage,
  limit,
  apiEndpoint,
  formatRowsCallback,
  titles
) {
  const [state] = useCheckboxContext();
  const location = useLocation();
  const [tableData, setTableData] = useState({
    titles: titles,
    rows: [],
  });
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    totalPages: 1,
  });

  //MEMOIZING THIS FUNCTION PREVENTS FREQUENT REQUESTS TO BACK END
  const memoizedFormatRowsCallback = useCallback(formatRowsCallback, []);

  // REQUESTS FOR PRODUCTS AND ORDERS
  useEffect(() => {
    //GET DATA PAGE BY PAGE
    const fetchData = async () => {
      try {
        let response = await axios.get(
          `${apiEndpoint}?page=${pagination.currentPage}&limit=${limit}`
        );
        let formattedRows;
        //-----------------REQUESTING FOR ORDERS--------------------
        if (location.pathname.includes("orders_manage")) {
          // sending different requests based on delivery status
          if (state.pendingChecked) {
            response = await axios.get(
              `${apiEndpoint}?page=${pagination.currentPage}&limit=${limit}&deliveryStatus=false`
            );
          } else if (state.deliveredChecked) {
            response = await axios.get(
              `${apiEndpoint}?page=${5}&limit=${limit}&deliveryStatus=true`
            );
          }
          const data = response.data.data.orders;
          // another req for the user bc the db returns user ID !
          formattedRows = await Promise.all(
            data.map(async (item) => {
              const user = await getInfoById(item.user, "users");
              return memoizedFormatRowsCallback(item, user);
            })
          );
        } else {
          //-----------------REQUESTING FOR PRODUCTS--------------------
          const data = response.data.data.products;
          // another req for the category and subcategory bc the db returns user ID !
          formattedRows = await Promise.all(
            data.map(async (item) => {
              const category = await getInfoById(
                item.category,
                "categories"
              );
              const subCategory = await getInfoById(
                item.subcategory,
                "subcategories"
              );
              return memoizedFormatRowsCallback(
                item,
                category,
                subCategory
              );
            })
          );
        }
        // PUT FORMATTED ROWS IN TABLE
        setTableData((prevTableData) => ({
          ...prevTableData,
          rows: formattedRows,
        }));
        // SET PAGINATION ACCORDING TO THE FETCHED DATA
        setPagination((prevPagination) => ({
          ...prevPagination,
          totalPages: response.data.total_pages,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [
    pagination.currentPage,
    limit,
    apiEndpoint,
    location.pathname,
    state.pendingChecked,
    state.deliveredChecked,
  ]);

  // THIS IS USED TO BE PASSED THROUGH PROPS TO PAGINATION COMPONENT
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
}

const getInfoById = async (id, apiEndpoint) => {
  try {
    const name = await axios.get(
      `http://localhost:8000/api/${apiEndpoint}/${id}`
    );
    const response = name.data.data;
    // ---categories---
    if (apiEndpoint === "categories") return response.category.name;
    // ---subcategories---
    else if (apiEndpoint === "subcategories")
      return response.subcategory.name;
    // ---firstname/lastname---
    else
      return [response.user.firstname, response.user.lastname].join(" ");
  } catch (error) {
    console.error("Error fetching category name:", error);
    return "Unknown Category";
  }
};
