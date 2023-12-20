import { useState } from "react";

function useCounter(initialValue = 0, max = 10) {
  const [quantity, setQuantity] = useState(initialValue);

  const handleQuantityIncrement = () => {
    if (quantity < max) {
      setQuantity((quantity) => quantity + 1);
    } else return quantity;
  };

  const handleQuantityDecrement = () => {
    if (quantity > 1) setQuantity((quantity) => quantity - 1);
    else if (quantity === 1) setQuantity(0);
    else return quantity;
  };

  return { quantity, handleQuantityDecrement, handleQuantityIncrement };
}

export default useCounter;
