import toPersianDigits from "../../../helpers/toPersianDigits";
import { NavBar } from "../NavBar";
import { getInfoById } from "../../../helpers/getInfoById";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../../config/axiosInstance";

export function GroupProducts() {
  const { groupId } = useParams();
  const [currentGroup, setCurrentGroup] = useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await getInfoById(groupId, "categories");
        setCurrentGroup(categoryRes);
        const productRes = await api.get(
          `/products?fields=-rating,-createdAt,-updatedAt,-__v&sort=rate&category=${groupId}`
        );
        const allProducts = productRes.data.data.products;
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [groupId]);
  return (
    <>
      <NavBar />
      <div className="m-10">
        <h1 className="inline-block text-3xl font-bold border-b-2 border-dashed border-indigo-500 pb-4">
          محصولات {currentGroup}
        </h1>
        <div className="grid grid-cols-5 p-12 gap-y-20">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <Link to={`/products/details/${product._id}`}>
                <img
                  src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                  alt={product.slugname}
                  width={200}
                />
              </Link>
              <div className="flex flex-col gap-4 items-center">
                <span className="text-lg w-[200px] break-words line-clamp-2">
                  {product.name}
                </span>
                <span className="text-lg self-end vertical-flex gap-2">
                  {toPersianDigits(product.price.toFixed(3))}
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
