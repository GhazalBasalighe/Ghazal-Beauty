import { Plus, Minus, Trash } from "@phosphor-icons/react";
import useCounter from "../../../hooks/useCounter";
import toPersianDigits from "../../../helpers/toPersianDigits";
export function Counter({ initialVal }) {
  const {
    quantity,
    handleQuantityDecrement: decrement,
    handleQuantityIncrement: increment,
  } = useCounter(initialVal);

  // CHOOSE THE ICON TO DISPLAY BASED ON THE QUANTITY
  const decrementIcon =
    quantity !== 1 ? (
      <Minus
        size={30}
        onClick={decrement}
        className="p-1 cursor-pointer"
        weight="bold"
      />
    ) : (
      <Trash
        size={30}
        onClick={decrement}
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
        onClick={increment}
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
