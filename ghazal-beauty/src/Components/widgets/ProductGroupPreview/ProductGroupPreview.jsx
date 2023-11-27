import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { NextArrow, PrevArrow } from "../../../utils";

export function ProductGroupPreview() {
  // ADJUST REACT SLICK SETTINGS
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    initialSlide: 5,
    slidesToScroll: 3,
    rtl: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="px-8 py-5">
      {/* TITLE */}
      <div className="vertical-flex gap-3 font-bold text-xl border-b-2 border-solid border-violet-400 pb-2">
        <img
          src="src/assets/groupIcons/hairProducts.png"
          alt="hair products group"
          width={45}
        />
        <span className="vertical-flex gap-1 cursor-pointer">
          محصولات
          <span className=" text-violet-500">مویی</span>
        </span>
      </div>
      {/* PRODUCT GROUP PREVIEW */}
      <div>
        <Slider {...settings} className="my-2 text-right">
          <div dir="rtl">
            <div className="product-card">
              <img
                src="src/assets/faceWash.jpg"
                alt="face wash"
                width={100}
              />
              <div className="flex flex-col gap-4 items-center">
                <span className="text-xs w-[200px] break-words line-clamp-2">
                  ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200
                  میلی لیتر
                </span>
                <span className="text-sm self-end">
                  119,880{" "}
                  <span className="text-xs text-gray-500">تومان</span>
                </span>
              </div>
            </div>
          </div>{" "}
          <div dir="rtl">
            <div className="product-card">
              <img
                src="src/assets/faceWash.jpg"
                alt="face wash"
                width={100}
              />
              <div className="flex flex-col gap-4 items-center">
                <span className="text-xs w-[200px] break-words line-clamp-2">
                  ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200
                  میلی لیتر
                </span>
                <span className="text-sm self-end">
                  119,880{" "}
                  <span className="text-xs text-gray-500">تومان</span>
                </span>
              </div>
            </div>
          </div>{" "}
          <div dir="rtl">
            <div className="product-card">
              <img
                src="src/assets/faceWash.jpg"
                alt="face wash"
                width={100}
              />
              <div className="flex flex-col gap-4 items-center">
                <span className="text-xs w-[200px] break-words line-clamp-2">
                  ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200
                  میلی لیتر
                </span>
                <span className="text-sm self-end">
                  119,880{" "}
                  <span className="text-xs text-gray-500">تومان</span>
                </span>
              </div>
            </div>
          </div>{" "}
          <div dir="rtl">
            <div className="product-card">
              <img
                src="src/assets/faceWash.jpg"
                alt="face wash"
                width={100}
              />
              <div className="flex flex-col gap-4 items-center">
                <span className="text-xs w-[200px] break-words line-clamp-2">
                  ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200
                  میلی لیتر
                </span>
                <span className="text-sm self-end">
                  119,880{" "}
                  <span className="text-xs text-gray-500">تومان</span>
                </span>
              </div>
            </div>
          </div>{" "}
          <div dir="rtl">
            <div className="product-card">
              <img
                src="src/assets/faceWash.jpg"
                alt="face wash"
                width={100}
              />
              <div className="flex flex-col gap-4 items-center">
                <span className="text-xs w-[200px] break-words line-clamp-2">
                  ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200
                  میلی لیتر
                </span>
                <span className="text-sm self-end">
                  119,880{" "}
                  <span className="text-xs text-gray-500">تومان</span>
                </span>
              </div>
            </div>
          </div>{" "}
          <div dir="rtl">
            <div className="product-card">
              <img
                src="src/assets/faceWash.jpg"
                alt="face wash"
                width={100}
              />
              <div className="flex flex-col gap-4 items-center">
                <span className="text-xs w-[200px] break-words line-clamp-2">
                  ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200
                  میلی لیتر
                </span>
                <span className="text-sm self-end">
                  119,880{" "}
                  <span className="text-xs text-gray-500">تومان</span>
                </span>
              </div>
            </div>
          </div>{" "}
          <div dir="rtl">
            <div className="product-card">
              <img
                src="src/assets/faceWash.jpg"
                alt="face wash"
                width={100}
              />
              <div className="flex flex-col gap-4 items-center">
                <span className="text-xs w-[200px] break-words line-clamp-2">
                  ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200
                  میلی لیتر
                </span>
                <span className="text-sm self-end">
                  119,880{" "}
                  <span className="text-xs text-gray-500">تومان</span>
                </span>
              </div>
            </div>
          </div>{" "}
          <div dir="rtl">
            <div className="product-card">
              <img
                src="src/assets/faceWash.jpg"
                alt="face wash"
                width={100}
              />
              <div className="flex flex-col gap-4 items-center">
                <span className="text-xs w-[200px] break-words line-clamp-2">
                  ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200
                  میلی لیتر
                </span>
                <span className="text-sm self-end">
                  119,880{" "}
                  <span className="text-xs text-gray-500">تومان</span>
                </span>
              </div>
            </div>
          </div>{" "}
          <div dir="rtl">
            <div className="product-card">
              <img
                src="src/assets/faceWash.jpg"
                alt="face wash"
                width={100}
              />
              <div className="flex flex-col gap-4 items-center">
                <span className="text-xs w-[200px] break-words line-clamp-2">
                  ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200
                  میلی لیتر
                </span>
                <span className="text-sm self-end">
                  119,880{" "}
                  <span className="text-xs text-gray-500">تومان</span>
                </span>
              </div>
            </div>
          </div>{" "}
          <div dir="rtl">
            <div className="product-card">
              <img
                src="src/assets/faceWash.jpg"
                alt="face wash"
                width={100}
              />
              <div className="flex flex-col gap-4 items-center">
                <span className="text-xs w-[200px] break-words line-clamp-2">
                  ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200
                  میلی لیتر
                </span>
                <span className="text-sm self-end">
                  119,880{" "}
                  <span className="text-xs text-gray-500">تومان</span>
                </span>
              </div>
            </div>
          </div>{" "}
          <div dir="rtl">
            <div className="product-card">
              <img
                src="src/assets/faceWash.jpg"
                alt="face wash"
                width={100}
              />
              <div className="flex flex-col gap-4 items-center">
                <span className="text-xs w-[200px] break-words line-clamp-2">
                  ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200
                  میلی لیتر
                </span>
                <span className="text-sm self-end">
                  119,880{" "}
                  <span className="text-xs text-gray-500">تومان</span>
                </span>
              </div>
            </div>
          </div>{" "}
          <div dir="rtl">
            <div className="product-card">
              <img
                src="src/assets/faceWash.jpg"
                alt="face wash"
                width={100}
              />
              <div className="flex flex-col gap-4 items-center">
                <span className="text-xs w-[200px] break-words line-clamp-2">
                  ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200
                  میلی لیتر
                </span>
                <span className="text-sm self-end">
                  119,880{" "}
                  <span className="text-xs text-gray-500">تومان</span>
                </span>
              </div>
            </div>
          </div>{" "}
          <div dir="rtl">
            <div className="product-card">
              <img
                src="src/assets/faceWash.jpg"
                alt="face wash"
                width={100}
              />
              <div className="flex flex-col gap-4 items-center">
                <span className="text-xs w-[200px] break-words line-clamp-2">
                  ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200
                  میلی لیتر
                </span>
                <span className="text-sm self-end">
                  119,880{" "}
                  <span className="text-xs text-gray-500">تومان</span>
                </span>
              </div>
            </div>
          </div>{" "}
          <div dir="rtl">
            <div className="product-card">
              <img
                src="src/assets/faceWash.jpg"
                alt="face wash"
                width={100}
              />
              <div className="flex flex-col gap-4 items-center">
                <span className="text-xs w-[200px] break-words line-clamp-2">
                  ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200
                  میلی لیتر
                </span>
                <span className="text-sm self-end">
                  119,880{" "}
                  <span className="text-xs text-gray-500">تومان</span>
                </span>
              </div>
            </div>
          </div>{" "}
          <div dir="rtl">
            <div className="product-card">
              <img
                src="src/assets/faceWash.jpg"
                alt="face wash"
                width={100}
              />
              <div className="flex flex-col gap-4 items-center">
                <span className="text-xs w-[200px] break-words line-clamp-2">
                  ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200
                  میلی لیتر
                </span>
                <span className="text-sm self-end">
                  119,880{" "}
                  <span className="text-xs text-gray-500">تومان</span>
                </span>
              </div>
            </div>
          </div>{" "}
        </Slider>
      </div>
    </div>
  );
}
