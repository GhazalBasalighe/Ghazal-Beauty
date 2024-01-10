import { NavBar } from "../NavBar";
import { useParams, Link } from "react-router-dom";
import api from "../../../config/axiosConfig";
import { SyncLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function SubGroupProducts() {
  const { subgroupId } = useParams();

  //GET SUBCATEGORIES
  const {
    data: currentSubCategory,
    isLoading: currentSubCategoryLoading,
    refetch: refetchSubCategory,
  } = useQuery({
    queryKey: ["currentSubCategory"],
    queryFn: async () => {
      const response = await api.get(`/subcategories/${subgroupId}`);
      return response.data.data.subcategory;
    },
  });

  //GET PRODUCTS
  const {
    data: products,
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get(
        `/products?fields=-rating,-createdAt,-updatedAt,-__v&sort=rate&subcategory=${subgroupId}`
      );
      return response.data.data.products;
    },
  });

  useEffect(() => {
    refetchSubCategory();
    refetchProducts();
  }, [subgroupId, refetchSubCategory, refetchProducts]);

  if (currentSubCategoryLoading || productsLoading) {
    return (
      <SyncLoader color="#a056b9" className="fixed top-1/2 left-1/2" />
    );
  }
  return (
    <>
      <NavBar />
      <div className="m-10">
        <h1 className="inline-block text-3xl font-bold border-b-2 border-dashed border-indigo-500 pb-4">
          {currentSubCategory.name}
        </h1>
        <div className="grid grid-cols-5 p-12 gap-y-20">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <Link to={`/products/details/${product._id}`}>
                <img
                  src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                  alt={product._id}
                  width={200}
                />
              </Link>
              <div className="flex flex-col gap-4 items-center">
                <span className="text-lg w-[200px] break-words line-clamp-2">
                  {product.name}
                </span>
                <span className="text-lg self-end vertical-flex gap-2">
                  {product.price.toLocaleString("fa-IR")}
                  <span className="text-base text-gray-500">تومان</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
