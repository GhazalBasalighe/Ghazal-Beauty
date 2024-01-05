import React from "react";
import { Link } from "react-router-dom";
export const ProductCard = ({ product }) => {
  return (
    <div dir="rtl">
      <div className="product-card">
        <Link to={`/products/details/${product._id}`}>
          <img
            src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
            alt={product.name}
            width={250}
          />
        </Link>
        <div className="flex flex-col gap-4 items-center">
          <span className="text-base w-[200px] break-words line-clamp-2">
            {product.name}
          </span>
          <span className="text-base self-end vertical-flex gap-1">
            {product.price.toLocaleString("fa-IR")}
            <span className="text-sm text-gray-500">تومان</span>
          </span>
        </div>
      </div>
    </div>
  );
};
