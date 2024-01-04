import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCheckboxContext } from "../context/checkboxContext";
import { useDispatch, useSelector } from "react-redux";
import api from "../config/axiosInstance";
import { setIsLoading } from "../store/slices/authSlice";
export function useRequest(
  initialPage,
  limit,
  apiEndpoint,
  formatRowsCallback,
  titles
) {
  const [state] = useCheckboxContext();
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const updateSignal = useSelector(
    (state) => state.auth.productUpdateSignal
  );
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState({
    titles: titles,
    rows: [],
  });
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    totalPages: 1,
  });

  const [initialPageState] = useState(initialPage);

  useEffect(() => {
    setPagination({
      currentPage: initialPageState,
      totalPages: 1,
    });
  }, [state.allChecked, state.pendingChecked, state.deliveredChecked]);

  // REQUESTS FOR PRODUCTS AND ORDERS
  useEffect(() => {
    //GET DATA PAGE BY PAGE
    const fetchData = async () => {
      try {
        dispatch(setIsLoading(true));
        let response = await api.get(
          `${apiEndpoint}?page=${pagination.currentPage}&limit=${limit}`
        );

        let data;
        //-----------------REQUESTING FOR ORDERS--------------------
        if (location.pathname.includes("orders_manage")) {
          // sending different requests based on delivery status
          if (state.pendingChecked) {
            response = await api.get(
              `${apiEndpoint}?page=${pagination.currentPage}&limit=${limit}&deliveryStatus=false`
            );
          } else if (state.deliveredChecked) {
            response = await api.get(
              `${apiEndpoint}?page=${pagination.currentPage}&limit=${limit}&deliveryStatus=true`
            );
          }
          data = response.data.data.orders;
        } else {
          //-----------------REQUESTING FOR PRODUCTS--------------------
          data = response.data.data.products;
        }

        const formattedRows = data.map((item) => formatRowsCallback(item));
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
        dispatch(setIsLoading(false));
        navigate(`${location.pathname}?page=${pagination.currentPage}`);
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch(setIsLoading(false));
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
    accessToken,
    updateSignal,
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
