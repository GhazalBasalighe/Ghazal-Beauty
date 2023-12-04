import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <CaretLeft
      size={100}
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
}

export function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <CaretRight
      size={100}
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
}
