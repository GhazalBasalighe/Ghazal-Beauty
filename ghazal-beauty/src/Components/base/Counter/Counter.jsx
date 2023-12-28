import { Plus, Minus, Trash } from "@phosphor-icons/react";
import useCounter from "../../../hooks/useCounter";
import toPersianDigits from "../../../helpers/toPersianDigits";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../store/slices/cartSlice";
export function Counter({ productId, initialVal, max, onQuantityChange }) {
  const items = useSelector((state) => state.cart.items);
  const [initialValue, setInitialValue] = useState(initialVal);
  useEffect(() => {
    if (productId) {
      const item = items.find((item) => item._id === productId);
      if (item) {
        setInitialValue(item.count);
      }
    }
  }, [productId]);
  const {
    quantity,
    handleQuantityDecrement: decrement,
    handleQuantityIncrement: increment,
  } = useCounter(initialValue, max);

  // CHOOSE THE ICON TO DISPLAY BASED ON THE QUANTITY
  const dispatch = useDispatch();
  const decrementIcon =
    quantity !== 1 ? (
      <Minus
        size={30}
        onClick={() => {
          decrement();
          onQuantityChange(quantity - 1);
        }}
        className="p-1 cursor-pointer"
        weight="bold"
      />
    ) : (
      <Trash
        size={30}
        onClick={() => {
          decrement();
          onQuantityChange(0);
          dispatch(removeFromCart(productId));
        }}
        className="p-1 cursor-pointer"
        weight="bold"
      />
    );
  // IF THERE WAS NO PRODUCT CHOSEN SHOW SOMETHING DIFFERENT
  if (quantity === 0) {
    return (
      <Plus
        size={30}
        onClick={increment}
        className="p-1 cursor-pointer bg-violet-100 text-purple-800 rounded-full"
        weight="bold"
      />
    );
  }

  return (
    <div className="vertical-flex bg-violet-100 text-purple-800 rounded-md ">
      <Plus
        size={30}
        onClick={() => {
          increment();
          onQuantityChange(quantity + 1);
        }}
        className="p-1 cursor-pointer"
        weight="bold"
      />
      <span className="p-3 font-bold">
        {toPersianDigits(quantity.toString())}
      </span>
      {decrementIcon}
    </div>
  );
}
