import { X } from "@phosphor-icons/react";
import { PrivateRoute } from "../Components";

function PaymentFailure() {
  return (
    <>
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-3xl text-center vertical-flex gap-3">
          <X
            size={80}
            className="bg-red-500 rounded-full text-white p-4"
          />
          <span>پرداخت موفقت آمیز نبود</span>
        </h1>
        <h2 className="text-2xl text-center my-8 vertical-flex gap-3">
          سفارش شما در انتظار پرداخت مجدد است...
        </h2>
        <div className="grid place-items-center">
          <img
            src="src/assets/paymentFailed.svg"
            alt="order confirmed"
            className="w-1/2 h-auto"
          />
        </div>
      </div>
    </>
  );
}

export default PrivateRoute(PaymentFailure);
