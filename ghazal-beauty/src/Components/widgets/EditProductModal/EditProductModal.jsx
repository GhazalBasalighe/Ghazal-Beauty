import { CurrencyDollar, Package } from "@phosphor-icons/react";
import { Modal, Button, Counter } from "../../base";
import toPersianDigits from "../../../helpers/toPersianDigits";

export function EditProductModal({ closeModal, productInfo }) {
  return (
    <Modal title={"ویرایش قیمت و موجودی"} closeModal={closeModal}>
      <div className="flex flex-col gap-5 my-5">
        <h1 className="text-xl">
          شما در حال ویرایش قیمت و موجودی کالای زیر هستید:{" "}
        </h1>
        <div className="vertical-flex">
          <img
            src={`http://localhost:8000/images/products/thumbnails/${productInfo.thumbnail}`}
            alt="product image"
            width={90}
          />
          <span>{productInfo.name}</span>
        </div>
        <div className="vertical-flex self-center gap-6">
          <div className="vertical-flex gap-5 p-3 rounded-lg shadow max-w-max">
            <div className="vertical-flex gap-2">
              <Package size={24} />
              <span>تعداد موجود در انبار</span>
            </div>
            <Counter initialVal={productInfo.quantity} />
          </div>
          <div className="vertical-flex gap-5 p-3 rounded-lg shadow max-w-max">
            <div className="vertical-flex gap-2">
              <CurrencyDollar size={24} />
              <span>قیمت هر محصول</span>
            </div>
            <input
              type="text"
              value={toPersianDigits(productInfo.price.toFixed(2))}
              className="outline-none bg-violet-100 text-purple-800 font-bold text-center p-1 rounded-md w-[100px]"
            />
          </div>
        </div>
        <Button classes=" self-center">اعمال تغییرات</Button>
      </div>
    </Modal>
  );
}
