import { Button, Counter } from "../../base";
import { Handbag } from "@phosphor-icons/react";

export function Cart() {
  return (
    <div className="vertical-flex justify-center gap-16">
      {/* RIGHT SIDE , THE CART */}
      <div className="flex flex-col gap-8">
        <div className="vertical-flex justify-between gap-10 border-b border-solid border-gray-500 py-4">
          <div className="vertical-flex">
            <img
              src="src/assets/faceWash.jpg"
              alt="face wash"
              width={90}
            />
            <div className="flex flex-col gap-5">
              <span className="font-semibold text-sm">
                ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200 میلی
                لیتر
              </span>
              <span className=" font-light text-xs text-gray-500">
                موجود در انبار
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Counter />
            <span>53,850تومان</span>
          </div>
        </div>
        <div className="vertical-flex justify-between gap-10 border-b border-solid border-gray-500 py-4">
          <div className="vertical-flex">
            <img
              src="src/assets/faceWash.jpg"
              alt="face wash"
              width={90}
            />
            <div className="flex flex-col gap-5">
              <span className="font-semibold text-sm">
                ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200 میلی
                لیتر
              </span>
              <span className=" font-light text-xs text-gray-500">
                موجود در انبار
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Counter />
            <span>53,850تومان</span>
          </div>
        </div>
        <div className="vertical-flex justify-between gap-10 border-b border-solid border-gray-500 py-4">
          <div className="vertical-flex">
            <img
              src="src/assets/faceWash.jpg"
              alt="face wash"
              width={90}
            />
            <div className="flex flex-col gap-5">
              <span className="font-semibold text-sm">
                ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200 میلی
                لیتر
              </span>
              <span className=" font-light text-xs text-gray-500">
                موجود در انبار
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Counter />
            <span>53,850تومان</span>
          </div>
        </div>
      </div>
      {/* LEFT SIDE , THE CART INFO */}
      <div className="self-start">
        <div className="vertical-flex justify-between p-5 rounded-t-xl border border-solid border-violet-600 ">
          <span className="font-semibold">کالاهای موجود در سبد خرید</span>
          <span className="font-semibold text-violet-600 vertical-flex gap-2">
            <Handbag size={25} />
            <span>2</span>
          </span>
        </div>
        <div className="flex flex-col gap-5 shadow-lg p-6 rounded-b-xl border border-solid border-violet-600 w-80">
          <div className=" text-sm text-fadedBlack vertical-flex justify-between ">
            <span>قیمت</span>
            <span>22,000 تومان</span>
          </div>
          <div className=" text-sm text-fadedBlack vertical-flex justify-between ">
            <span>تخفیف محصولات</span>
            <span>18,700 تومان</span>
          </div>
          <div className=" text-sm text-fadedBlack vertical-flex justify-between ">
            <span>قابل پرداخت</span>
            <span>3,300تومان</span>
          </div>
          <Button>ادامه فرایند خرید</Button>
        </div>
      </div>
    </div>
  );
}
