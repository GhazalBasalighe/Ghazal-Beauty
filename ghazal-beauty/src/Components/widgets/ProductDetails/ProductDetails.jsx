import { useParams } from "react-router-dom";
import toPersianDigits from "../../../helpers/toPersianDigits";
import { Button, Counter } from "../../base";
import { getInfoById } from "../../../helpers/getInfoById";
import { useState, useEffect } from "react";
import { CaretLeft } from "@phosphor-icons/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../../../utils";

// SLIDER SETTINGS
const settings = {
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  rtl: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

export function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: 0,
    brand: "",
    category: "",
    subcategory: "",
    images: [],
    description: "",
    slugname: "",
    rating: { rate: 0 },
  });

  const fetchData = async () => {
    try {
      const productRes = await getInfoById(productId, "products");
      setProduct(productRes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  const productQuantityMessage = (
    <span className="text-gray-700 font-semibold text-base">
      {product.quantity === 0
        ? "ناموجود"
        : product.quantity < 10
        ? `فقط ${product.quantity} عدد در انبار باقی مانده`
        : "موجود در انبار"}
    </span>
  );

  return (
    <div className="flex flex-col gap-10 px-20 mt-3">
      <div className="vertical-flex justify-between ">
        <div className="vertical-flex justify-center gap-10">
          <Slider {...settings} rtl className="w-[300px]">
            {product.images.map((image, index) => (
              <img
                src={`http://localhost:8000/images/products/images/${image}`}
                alt={product.slugname}
                key={index}
              />
            ))}
          </Slider>
          <div className="flex flex-col gap-5">
            <span className="font-semibold text-xl">{product.name}</span>
            <span className="text-gray-500 text-sm">
              {"star".repeat(product.rating.rate)}
            </span>
            <div className="vertical-flex gap-2">
              <span>{product.category.name}</span>
              <CaretLeft />
              <span> {product.subcategory.name} </span>
            </div>
            <div className="vertical-flex gap-2">
              <span> برند</span>
              <span className="text-lg font-bold">
                {product.brand.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 shadow-lg p-10 rounded-xl border border-solid border-violet-600">
          <span className="font-semibold text-xl">
            {toPersianDigits(product.price.toFixed(3))} تومان
          </span>
          <Counter max={product.quantity} />
          <div className="flex flex-col gap-4">
            {productQuantityMessage}
            <Button>افزودن به سبد خرید</Button>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-violet-600 self-center"></div>
      <div
        className="leading-10"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
    </div>
  );
}
