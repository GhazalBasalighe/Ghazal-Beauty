import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  cssEase: "linear",
};

export function HeroSection() {
  return (
    <div className="overflow-x-hidden">
      <Slider {...settings} className="">
        <img
          src="/HeroSectionPics/hero1.webp"
          alt=""
          className="h-[650px]"
        />
        <img
          src="/HeroSectionPics/hero2.jpg"
          alt=""
          className="h-[650px]"
        />
        <img
          src="/HeroSectionPics/hero3.jpg"
          alt=""
          className="h-[650px]"
        />
        <img
          src="/HeroSectionPics/hero4.jpg"
          alt=""
          className="h-[650px]"
        />
        <img
          src="/HeroSectionPics/hero5.jpg"
          alt=""
          className="h-[650px]"
        />
        <img
          src="/HeroSectionPics/hero6.jpg"
          alt=""
          className="h-[650px]"
        />
        <img
          src="/HeroSectionPics/hero7.jpg"
          alt=""
          className="h-[650px]"
        />
        <img
          src="/HeroSectionPics/hero8.jpg"
          alt=""
          className="h-[650px]"
        />
        <img
          src="/HeroSectionPics/hero9.jpg"
          alt=""
          className="h-[650px]"
        />
        <img
          src="/HeroSectionPics/hero10.jpg"
          alt=""
          className="h-[650px]"
        />
        <img
          src="/HeroSectionPics/hero11.jpg"
          alt=""
          className="h-[650px]"
        />
      </Slider>
    </div>
  );
}
