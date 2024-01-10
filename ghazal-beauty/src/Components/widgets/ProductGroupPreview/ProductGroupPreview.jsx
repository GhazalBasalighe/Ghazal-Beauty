import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductCard, ProductContainer } from "../../base";
import { NextArrow, PrevArrow } from "../../../utils";
import { useState, useEffect } from "react";
import api from "../../../config/axiosConfig";
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
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
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
        <div key={category._id} className="px-8 py-5">
          {/* TITLE */}
          <div className="vertical-flex gap-3 font-bold text-xl border-b-2 border-solid border-violet-400 pb-2">
            <img
              src={`http://localhost:8000/images/categories/icons/${category.icon}`}
              alt={`${category.name} group`}
              width={45}
            />
            <Link to={`/products/group/${category._id}`}>
              <span className="vertical-flex gap-1">
                محصولات
                <span className=" text-violet-500">{category.name}</span>
              </span>
            </Link>
          </div>
          {/* PRODUCT GROUP PREVIEW */}
          <div>
            <Slider {...settings} className="my-2 text-right">
              {categoryProducts[category._id]?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </Slider>
          </div>
        </div>
      ))}
    </ProductContainer>
  );
}
