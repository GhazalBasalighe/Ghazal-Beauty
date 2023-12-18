import { Modal } from "../../base";

export function DeleteProductModal({ closeModal, productInfo }) {
  return (
    <Modal title={"حذف کالا"} closeModal={closeModal}>
      <div className="flex flex-col gap-5 my-5">
        <h1 className="text-xl ">مطمئنی میخواهی این کالا رو حذف کنی؟</h1>
        <div className="vertical-flex">
          <img
            src={`http://localhost:8000/images/products/thumbnails/${productInfo.thumbnail}`}
            alt="product image"
            width={70}
          />
          <span>{productInfo.name}</span>
        </div>

        <div className="vertical-flex self-center gap-6 w-[70%]">
          <button
            className="bg-violet-500 text-white w-2/3 p-3 rounded-lg text-center hover:scale-105 duration-200"
            onClick={() => closeModal("delete")}
          >
            نه
          </button>
          <button className="bg-violet-300 text-white w-1/3 p-3 rounded-lg text-center hover:scale-105 duration-200">
            آره
          </button>
        </div>
      </div>
    </Modal>
  );
}
