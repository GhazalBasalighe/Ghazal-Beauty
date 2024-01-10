import { NavBar } from "../NavBar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../../config/axiosConfig";
import { ProductCard } from "../../base";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowUp } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";

export function GroupProducts() {
  const { groupId } = useParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  //GET CATEGORIES
  const { data: currentCategoryData, isLoading: currentCategoryLoading } =
    useQuery({
      queryKey: ["currentCategory"],
      queryFn: async () => {
        const response = await api.get(`/categories/${groupId}`);
        return response.data.data.category;
      },
    });

  //GET PRODUCTS
  const {
    data: productsData,
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get(
        `/products?fields=-rating,-createdAt,-updatedAt,-__v&sort=rate&category=${groupId}&page=${page}`
      );
      return response.data.data.products;
    },
  });

  useEffect(() => {
    refetchProducts();
  }, [page]);

  useEffect(() => {
    if (productsData) {
      if (productsData.length === 0) {
        setHasMore(false);
      }
      const newProducts = productsData.filter(
        (newProduct) =>
          !products.find((product) => product._id === newProduct._id)
      );
      setProducts((prevProducts) =>
        page === 1 ? newProducts : [...prevProducts, ...newProducts]
      );
    }
  }, [productsData, page]);

  const handleFetchData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // SCROLL UP FUNCTION USED BY INFINITE SCROLL
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (currentCategoryLoading || productsLoading) {
    return (
      <SyncLoader color="#a056b9" className="fixed top-1/2 left-1/2" />
    );
  } else {
    return (
      <>
        <NavBar />
        <div className="m-10">
          <h1 className="inline-block text-3xl font-bold border-b-2 border-dashed border-indigo-500 pb-4">
            محصولات {currentCategoryData.name}
          </h1>
          <InfiniteScroll
            dataLength={products.length}
            next={handleFetchData}
            hasMore={hasMore}
            endMessage={
              <div
                className="vertical-flex gap-3 cursor-pointer font-bold text-3xl text-violet-500 absolute left-1/2 -translate-x-1/2 my-4"
                onClick={scrollToTop}
              >
                <ArrowUp weight="bold" />
                <span>برگشت به بالا </span>
                <ArrowUp weight="bold" />
              </div>
            }
          >
            <div className="grid grid-cols-5 py-4 px-10 gap-y-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}
