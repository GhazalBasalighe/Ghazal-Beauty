import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useCounter(productId, max = 10, onQuantityChange) {
  const [quantity, setQuantity] = useState(0);
  const items = useSelector((state) => state.cart.items);

  // IF PRODUCT ALREADY IN CART , INITIALIZE WITH ITS COUNT
  useEffect(() => {
    if (productId) {
      const item = items.find((item) => item._id === productId);
      if (item) {
        setQuantity(item.count);
      }
    }
  }, [productId]);

  useEffect(() => {
    onQuantityChange(quantity);
  }, [quantity]);

  const handleQuantityIncrement = () => {
    if (quantity < max) setQuantity((prevQuantity) => prevQuantity + 1);
    else return quantity;
  };

  const handleQuantityDecrement = () => {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1);
    else if (quantity === 1) setQuantity(0);
    else return quantity;
  };

  return { quantity, handleQuantityDecrement, handleQuantityIncrement };
}

export default useCounter;
