import { CheckFat } from "@phosphor-icons/react";
import { BackButton } from "../Components/base";
import { PrivateRoute } from "../Components";
function PaymentSuccess() {
  return (
    <>
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-3xl text-center vertical-flex gap-3">
          <CheckFat
            size={80}
            className="bg-green-500 rounded-full text-white p-4"
          />
          <span>با تشکر از پرداخت شما</span>
        </h1>
        <h2 className="text-2xl text-center my-8 vertical-flex gap-3">
          سفارش شما ثبت شده و طی روزهای آتی جهت هماهنگی ارسال سفارش با شما
          تماس برقرار خواهد شد
        </h2>
        <div className="grid place-items-center">
          <img
            src="src/assets/paymentSuccessful.svg"
            alt="order confirmed"
            className="w-1/2 h-auto"
          />
        </div>
        <BackButton shouldLogOut={false} />
      </div>
    </>
  );
}

export default PrivateRoute(PaymentSuccess);
