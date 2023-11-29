import toPersianDigits from "../../../helpers/toPersianDigits";

const product = {
  name: "شوینده صورت هرچیزی نمیدونم دیگه بخدا",
  image: "src/assets/faceWash.jpg",
  price: toPersianDigits("140,000"),
};
export function SubGroupProducts() {
  return (
    <div className="m-10">
      <h1 className="inline-block text-3xl font-bold border-b-2 border-dashed border-indigo-500 pb-4">
        کالاهای گروه فلان
      </h1>
      <div className="grid grid-cols-5 p-12 gap-y-20">
        <div className="product-card">
          <img src={product.image} alt={product.name} width={200} />
          <div className="flex flex-col gap-4 items-center">
            <span className="text-lg w-[200px] break-words line-clamp-2">
              {product.name}
            </span>
            <span className="text-lg self-end">
              {product.price}{" "}
              <span className="text-base text-gray-500">تومان</span>
            </span>
          </div>
        </div>
        <div className="product-card">
          <img src={product.image} alt={product.name} width={200} />
          <div className="flex flex-col gap-4 items-center">
            <span className="text-lg w-[200px] break-words line-clamp-2">
              {product.name}
            </span>
            <span className="text-lg self-end">
              {product.price}{" "}
              <span className="text-base text-gray-500">تومان</span>
            </span>
          </div>
        </div>{" "}
        <div className="product-card">
          <img src={product.image} alt={product.name} width={200} />
          <div className="flex flex-col gap-4 items-center">
            <span className="text-lg w-[200px] break-words line-clamp-2">
              {product.name}
            </span>
            <span className="text-lg self-end">
              {product.price}{" "}
              <span className="text-base text-gray-500">تومان</span>
            </span>
          </div>
        </div>{" "}
        <div className="product-card">
          <img src={product.image} alt={product.name} width={200} />
          <div className="flex flex-col gap-4 items-center">
            <span className="text-lg w-[200px] break-words line-clamp-2">
              {product.name}
            </span>
            <span className="text-lg self-end">
              {product.price}{" "}
              <span className="text-base text-gray-500">تومان</span>
            </span>
          </div>
        </div>{" "}
        <div className="product-card">
          <img src={product.image} alt={product.name} width={200} />
          <div className="flex flex-col gap-4 items-center">
            <span className="text-lg w-[200px] break-words line-clamp-2">
              {product.name}
            </span>
            <span className="text-lg self-end">
              {product.price}{" "}
              <span className="text-base text-gray-500">تومان</span>
            </span>
          </div>
        </div>{" "}
        <div className="product-card">
          <img src={product.image} alt={product.name} width={200} />
          <div className="flex flex-col gap-4 items-center">
            <span className="text-lg w-[200px] break-words line-clamp-2">
              {product.name}
            </span>
            <span className="text-lg self-end">
              {product.price}{" "}
              <span className="text-base text-gray-500">تومان</span>
            </span>
          </div>
        </div>{" "}
        <div className="product-card">
          <img src={product.image} alt={product.name} width={200} />
          <div className="flex flex-col gap-4 items-center">
            <span className="text-lg w-[200px] break-words line-clamp-2">
              {product.name}
            </span>
            <span className="text-lg self-end">
              {product.price}{" "}
              <span className="text-base text-gray-500">تومان</span>
            </span>
          </div>
        </div>{" "}
        <div className="product-card">
          <img src={product.image} alt={product.name} width={200} />
          <div className="flex flex-col gap-4 items-center">
            <span className="text-lg w-[200px] break-words line-clamp-2">
              {product.name}
            </span>
            <span className="text-lg self-end">
              {product.price}{" "}
              <span className="text-base text-gray-500">تومان</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
