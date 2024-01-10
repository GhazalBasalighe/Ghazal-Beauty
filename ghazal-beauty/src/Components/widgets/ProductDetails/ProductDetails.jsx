import { useParams } from "react-router-dom";
import { Button, Counter } from "../../base";
import { useState, useEffect } from "react";
import { CaretLeft } from "@phosphor-icons/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../../../utils";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/slices/cartSlice";
import { Toaster } from "react-hot-toast";
import showToast from "../../../helpers/showToast";
import { SyncLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import api from "../../../config/axiosConfig";

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
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const dispatch = useDispatch();
  const { productId } = useParams();

  const handleQuantityChange = (newQuantity) => {
    setSelectedQuantity(newQuantity);
  };

  const {
    data: product,
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get(`/products/${productId}`);
      return response.data.data.product;
    },
  });
  useEffect(() => {
    refetchProducts();
  }, [productId]);

  function handleAddToCart() {
    if (selectedQuantity === 0) {
      showToast("لطفا تعداد محصول را انتخاب کنید", true);
      return;
    }
    const newItem = {
      ...product,
      count: selectedQuantity,
    };

    dispatch(addToCart(newItem));
    showToast("محصول با موفقیت به سبد خرید اضافه شد");
  }
  const productQuantityMessage = (
    <span className="text-gray-700 font-semibold text-base">
      {product?.quantity === 0
        ? "ناموجود"
        : product?.quantity < 10
        ? `فقط ${product?.quantity} عدد در انبار باقی مانده`
        : "موجود در انبار"}
    </span>
  );

  if (productsLoading) {
    return (
      <SyncLoader color="#a056b9" className="fixed top-1/2 left-1/2" />
    );
  }

  return (
    <div className="flex flex-col gap-10 px-20 mt-3">
      <Toaster />
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
            {product.price.toLocaleString("fa-IR")} تومان
          </span>
          <Counter
            productId={product._id}
            max={product.quantity}
            onQuantityChange={handleQuantityChange}
          />
          <div className="flex flex-col gap-4">
            {productQuantityMessage}
            <Button
              variant={product.quantity === 0 && "disabled"}
              onClick={handleAddToCart}
            >
              افزودن به سبد خرید
            </Button>
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
