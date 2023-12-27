import { useEffect, useState } from "react";
import api from "../../../config/axiosInstance";
import { Button, Counter } from "../../base";
import { Handbag } from "@phosphor-icons/react";
import toPersianDigits from "../../../helpers/toPersianDigits";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../../../store/slices/cartSlice";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import getTotalPrice from "../../../helpers/getTotalPrice";

export function Cart() {
  const orderProducts = useSelector((state) => state.cart.items);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const discount = Math.random() * 20;

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(addToCart({ _id: productId, count: newQuantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  async function handleChanges() {
    try {
      const response = await api.patch(
        `/orders/6570a86edc8c9dac09604142`,
        { products: orderProducts }
      );
      console.log("Order updated successfully!", response.data);
      navigate("/mock_payment");
    } catch (error) {
      console.error("Error updating order:", error);
    }
  }

  return (
    <div className="vertical-flex justify-center gap-16 mt-10">
      {/* RIGHT SIDE , THE CART */}
      {orderProducts.length === 0 && (
        <div className="flex flex-col gap-10 items-center">
          <img
            src="src/assets/emptyCart.svg"
            alt="empty cart"
            width={400}
          />
          <span className="text-2xl font-bold">سبد خرید شما خالی است</span>
        </div>
      )}
      <div className="flex flex-col gap-8 mb-10">
        {orderProducts.map((product) => (
          <div
            className="vertical-flex justify-between gap-10 border-b border-solid border-gray-500 py-4"
            key={product._id}
          >
            <div className="vertical-flex">
              <img
                src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                alt="face wash"
                width={90}
              />
              <div className="flex flex-col gap-5">
                <span className="font-semibold text-sm">
                  {product.name}
                </span>
                <span className=" font-light text-xs text-gray-500">
                  {product.count} عدد انتخاب شده
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Counter
                initialVal={product.count}
                max={product.quantity}
                onQuantityChange={(newQuantity) =>
                  handleQuantityChange(product._id, newQuantity)
                }
                productId={product._id}
              />
              <span>
                {toPersianDigits(product.price.toFixed(3))} تومان
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* LEFT SIDE , THE CART INFO */}
      <div className="self-start">
        <div className="vertical-flex justify-between p-5 rounded-t-xl border border-solid border-violet-600 ">
          <span className="font-semibold">کالاهای موجود در سبد خرید</span>
          <span className="font-semibold text-violet-600 vertical-flex gap-2">
            <Handbag size={25} />
            <span>{orderProducts.length}</span>
          </span>
        </div>
        <div className="flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-5 shadow-lg p-6 rounded-b-xl border border-solid border-violet-600 w-80">
            <div className=" text-sm text-fadedBlack vertical-flex justify-between ">
              <span>قیمت</span>
              <span>
                {toPersianDigits(getTotalPrice(orderProducts).toFixed(3))}{" "}
                تومان
              </span>
            </div>
            <div className=" text-sm text-fadedBlack vertical-flex justify-between ">
              <span>تخفیف محصولات</span>
              <span>{toPersianDigits(discount.toFixed(3))} تومان</span>
            </div>
            <div className=" text-sm text-fadedBlack vertical-flex justify-between ">
              <span>قابل پرداخت</span>
              <span>
                {toPersianDigits(
                  (getTotalPrice(orderProducts) - discount).toFixed(3)
                )}{" "}
                تومان
              </span>
            </div>
            <Button onClick={handleChanges}>ادامه فرایند خرید</Button>
          </div>
          <Button
            onClick={handleClearCart}
            classes=" vertical-flex gap-1 bg-violet-400 text-center hover:bg-violet-500"
          >
            <Trash size={20} />
            <span>خالی کردن سبد </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
