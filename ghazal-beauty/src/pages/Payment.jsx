import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/slices/cartSlice";
import api from "../config/axiosInstance";

function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderId = useSelector((state) => state.cart.orderId);

  function onConfirm() {
    dispatch(clearCart());
    navigate("/successful_payment");
  }

  async function onCancel() {
    try {
      await api.delete(`/orders/${orderId}`);
      dispatch(clearCart());
      navigate("/unsuccessful_payment");
    } catch (error) {
      console.error("Error cancelling order:", error.message);
      // Handle the error, show a message, or navigate to an error page
    }
  }
  return (
    <div className="grid place-items-center">
      <img
        src="behPardakht.jpg"
        alt="mock payment page"
        className="w-full relative"
      />
      <div className="vertical-flex gap-1 w-[21rem] text-[#f0f0f0] font-bold absolute top-[82%] left-[49%]">
        <button
          className="rounded-full bg-gradient-to-r from-green-500 to-lime-400 py-4 w-3/4"
          onClick={onConfirm}
        >
          پرداخت
        </button>
        <button
          className="rounded-full bg-amber-300 py-4 w-1/4"
          onClick={onCancel}
        >
          انصراف
        </button>
      </div>
    </div>
  );
}

export default Payment;
