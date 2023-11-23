import { useState } from "react";

function useCounter(initialValue = 0) {
  const [quantity, setQuantity] = useState(initialValue);

  const handleQuantityIncrement = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handleQuantityDecrement = () => {
    if (quantity > 0) setQuantity((quantity) => quantity - 1);
    else return quantity;
  };

  return { quantity, handleQuantityDecrement, handleQuantityIncrement };
}

export default useCounter;
