import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductContainer } from "../../base";
import { NextArrow, PrevArrow } from "../../../utils";
import { useState, useEffect } from "react";
import api from "../../../config/axiosInstance";
import toPersianDigits from "../../../helpers/toPersianDigits";
import { Link } from "react-router-dom";

export function ProductGroupPreview() {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);

  // ADJUST REACT SLICK SETTINGS
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    initialSlide: -1,
    slidesToScroll: 3,
    rtl: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesRes = await api.get("/categories");
        setCategories(categoriesRes.data.data.categories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    getCategories();
  }, []);

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const productsRes = await api.get(
        `/products?category=${categoryId}`
      );
      return productsRes.data.data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const productsData = {};
      for (const category of categories) {
        const categoryProducts = await fetchProductsByCategory(
          category._id
        );
        productsData[category._id] = categoryProducts;
      }
      setCategoryProducts(productsData);
    };

    fetchData();
  }, [categories]);

  return (
    <ProductContainer>
      {categories.map((category) => (
        <div key={category.id} className="px-8 py-5">
          {/* TITLE */}
          <div className="vertical-flex gap-3 font-bold text-xl border-b-2 border-solid border-violet-400 pb-2">
            <img
              src={`http://localhost:8000/images/categories/icons/${category.icon}`}
              alt={`${category.name} group`}
              width={45}
            />
            <span className="vertical-flex gap-1">
              محصولات
              <span className=" text-violet-500">{category.name}</span>
            </span>
          </div>
          {/* PRODUCT GROUP PREVIEW */}
          <div>
            <Slider {...settings} className="my-2 text-right">
              {categoryProducts[category._id]?.map((product) => (
                <div dir="rtl" key={product.id}>
                  <div className="product-card">
                    <Link to={`/products/details/${product._id}`}>
                      <img
                        src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                        alt={product.name}
                        width={100}
                      />
                    </Link>
                    <div className="flex flex-col gap-4 items-center">
                      <span className="text-xs w-[200px] break-words line-clamp-2">
                        {product.name}
                      </span>
                      <span className="text-sm self-end vertical-flex gap-1">
                        {toPersianDigits(product.price.toFixed(3))}
                        <span className="text-xs text-gray-500">
                          تومان
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ))}
    </ProductContainer>
  );
}
