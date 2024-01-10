import { useDispatch, useSelector } from "react-redux";
import api from "../../../config/axiosConfig";
import { Modal } from "../../base";
import { setProductUpdateSignal } from "../../../store/slices/authSlice";

export function DeleteProductModal({ closeModal, productInfo }) {
  const dispatch = useDispatch();
  const productUpdateSignal = useSelector(
    (state) => state.auth.productUpdateSignal
  );
  async function handleDelete() {
    try {
      await api.delete(`/products/${productInfo._id}`);
      dispatch(setProductUpdateSignal(!productUpdateSignal));
      closeModal("delete");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
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

        <div className="vertical-flex self-center gap-6 w-1/2">
          <button
            className="bg-green-500 text-white w-2/3 p-3 rounded-lg text-center hover:scale-105 duration-200"
            onClick={() => closeModal("delete")}
          >
            نه
          </button>
          <button
            className="bg-red-500 text-white w-1/3 p-3 rounded-lg text-center hover:scale-105 duration-200"
            onClick={() => handleDelete()}
          >
            آره
          </button>
        </div>
      </div>
    </Modal>
  );
}
