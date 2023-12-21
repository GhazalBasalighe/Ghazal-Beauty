import { NavBar } from "../NavBar";
import { getInfoById } from "../../../helpers/getInfoById";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../../config/axiosInstance";
import { ProductCard } from "../../base";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowUp } from "@phosphor-icons/react";

export function GroupProducts() {
  const { groupId } = useParams();
  const [currentGroup, setCurrentGroup] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    try {
      const categoryRes = await getInfoById(groupId, "categories");
      setCurrentGroup(categoryRes);
      const productRes = await api.get(
        `/products?fields=-rating,-createdAt,-updatedAt,-__v&sort=rate&category=${groupId}&page=${page}`
      );
      const newProducts = productRes.data.data.products;
      if (newProducts.length === 0) {
        setHasMore(false);
      }
      setProducts((prevProducts) =>
        page === 1 ? newProducts : [...prevProducts, ...newProducts]
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFetchData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchData();
  }, [groupId, page]);

  // SCROLL UP FUNCTION USED BY INFINITE SCROLL
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <NavBar />
      <div className="m-10">
        <h1 className="inline-block text-3xl font-bold border-b-2 border-dashed border-indigo-500 pb-4">
          محصولات {currentGroup}
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
              <ProductCard key={product.slugname} product={product} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}
