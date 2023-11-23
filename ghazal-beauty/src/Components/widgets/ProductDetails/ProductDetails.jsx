import { Button } from "../../base";
import { Plus, Minus } from "@phosphor-icons/react";
import useCounter from "../../../hooks/useCounter";

export function ProductDetails() {
  const {
    quantity,
    handleQuantityDecrement: decrement,
    handleQuantityIncrement: increment,
  } = useCounter();

  return (
    <div className="flex flex-col gap-10">
      <div className="vertical-flex justify-around">
        <div className="vertical-flex">
          <img src="src/assets/faceWash.jpg" alt="face wash" width={200} />
          <div className="flex flex-col gap-5">
            <span className="font-semibold text-xl">
              ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200 میلی
              لیتر
            </span>
            <span className="text-gray-500 text-sm">
              Neutrogena Sivilce Karciti Face Wash Gel 200 ml
            </span>
            <span>دسته‌ی لوازم آرایشی</span>
          </div>
        </div>
        <div className="flex flex-col gap-10 shadow-lg p-10 rounded-xl border border-solid border-violet-600">
          <span className="font-semibold text-xl">119,880 تومان</span>
          <div className="vertical-flex bg-violet-100 text-purple-800 rounded-md w-1/2">
            <Plus
              size={30}
              onClick={increment}
              className="p-1 cursor-pointer"
              weight="bold"
            />
            <span className="p-3 font-bold">{quantity}</span>
            <Minus
              size={30}
              onClick={decrement}
              className="p-1 cursor-pointer"
              weight="bold"
            />
          </div>
          <Button>افزودن به سبد خرید</Button>
        </div>
      </div>
      <div className="h-[1px] w-11/12 bg-violet-600 self-center"></div>
      <span className=" px-20 leading-10">
        ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200 میلی لیتر در
        جامعه کنونی مراقبت از پوست و اهمیت دادن به کیفیت آن یکی از مهم¬ترین
        ابعاد زیبایی چهره است. به همین علت، پاکسازی و سلامت پوست در صدر
        لیست مراقبت از آن قرار می¬گیرد. لذا شناخت محصولات شوینده پوست از
        جمله ژل شستشوی صورت نوتروژینا در جایگاه یک پاک کننده قوی و مطلوب،
        خالی از لطف نیست. همان¬طور که می‌دانید، جنس پوست هر شخص با شخص دیگر
        متفاوت است و خوب بودن یک محصول مراقب پوستی برای یک فرد دال بر این
        نیست که آن محصول برای همه افراد بهترین عملکرد را داشته باشد. درصد
        زیادی از افراد دارای پوست چرب و مستعد آکنه و جوش هستند؛ برای همین
        هم پیدا کردن یک شوینده مناسب پوست چرب برای این دسته از افراد در
        اولویت قرار دارد. ژل شستشوی صورت نوتروژینا دقیقا همان انتخاب
        فوق¬العاده¬ای است که می¬تواند تمام دغدغه¬های یک فرد با پوست چرب را
        رفع کرده و حداکثر میزان پاک کنندگی را داشته باشد. ژل شستشوی
        نوتروژینا نارنجی رنگ در سه مدل ارائه می¬شود که هر سه مدل می¬تواند
        بسته به نوع پوست فرد، بهترین گزینه برای شستشوی پوست شما باشد. از
        این رو قصد داریم در ادامه این مطلب به نقد و معرفی ژل شستشوی صورت
        نوتروژینا به عنوان یک پاک کننده بی نظیر و عالی بپردازیم.
      </span>
    </div>
  );
}
