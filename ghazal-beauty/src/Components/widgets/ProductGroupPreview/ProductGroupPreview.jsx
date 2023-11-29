import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductContainer } from "../../base";
import { NextArrow, PrevArrow } from "../../../utils";

const data = [
  {
    id: 1,
    name: "پوستی",
    icon: "src/assets/groupIcons/skinProducts.png",
    products: [
      {
        id: 1,
        name: "ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200 میلی لیتر",
        image: "src/assets/faceWash.jpg",
        price: 119880,
      },
      // more products here...
    ],
  },
  {
    id: 2,
    name: "آرایشی",
    icon: "src/assets/groupIcons/beautyProducts.png",
    products: [
      {
        id: 1,
        name: "ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200 میلی لیتر",
        image: "src/assets/faceWash.jpg",
        price: 119880,
      },
      {
        id: 2,
        name: "ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200 میلی لیتر",
        image: "src/assets/faceWash.jpg",
        price: 119880,
      },
      {
        id: 3,
        name: "ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200 میلی لیتر",
        image: "src/assets/faceWash.jpg",
        price: 119880,
      },
    ],
  },
  {
    id: 2,
    name: "مویی",
    icon: "src/assets/groupIcons/hairProducts.png",
    products: [
      {
        id: 1,
        name: "ژل شستشو صورت نوتروژینا مدل Sivilce Karciti ظرفیت 200 میلی لیتر",
        image: "src/assets/faceWash.jpg",
        price: 119880,
      },
    ],
  },
];

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
    <ProductContainer>
      {data.map((category) => (
        <div key={category.id} className="px-8 py-5">
          {/* TITLE */}
          <div className="vertical-flex gap-3 font-bold text-xl border-b-2 border-solid border-violet-400 pb-2">
            <img
              src={category.icon}
              alt={`${category.name} group`}
              width={45}
            />
            <span className="vertical-flex gap-1">
              محصولات
              <span className=" text-violet-500">{category.name}</span>
            </span>
          </div>
          {/* PRODUCT GROUP PREVIEW */}
          <div>
            <Slider {...settings} className="my-2 text-right">
              {category.products.map((product) => (
                <div dir="rtl" key={product.id}>
                  <div className="product-card">
                    <img
                      src={product.image}
                      alt={product.name}
                      width={100}
                    />
                    <div className="flex flex-col gap-4 items-center">
                      <span className="text-xs w-[200px] break-words line-clamp-2">
                        {product.name}
                      </span>
                      <span className="text-sm self-end">
                        {product.price}{" "}
                        <span className="text-xs text-gray-500">
                          تومان
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ))}
    </ProductContainer>
  );
}
