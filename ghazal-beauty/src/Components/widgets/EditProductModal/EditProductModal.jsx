import { CurrencyDollar, Package } from "@phosphor-icons/react";
import { Modal, Button } from "../../base";
import api from "../../../config/axiosInstance";
import { useFormik } from "formik";
import { priceValidationSchema } from "../../../utils";
export function EditProductModal({ closeModal, productInfo }) {
  const handleSaveChanges = async () => {
    try {
      const updatedProduct = {
        quantity: formik.values.quantity,
        price: formik.values.price,
      };
      await api.patch(`/products/${productInfo._id}`, updatedProduct);
      closeModal("editPrice");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      quantity: productInfo.quantity,
      price: productInfo.price,
    },
    validationSchema: priceValidationSchema,
    onSubmit: handleSaveChanges,
  });

  return (
    <Modal title={"ویرایش قیمت و موجودی"} closeModal={closeModal}>
      <form
        className="flex flex-col gap-5 my-5"
        onSubmit={formik.handleSubmit}
      >
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
          {/* QUANTITY */}
          <div className="flex flex-col gap-2 w-1/2">
            <div className="vertical-flex gap-5 p-3 rounded-lg shadow max-w-max">
              <div className="vertical-flex gap-2">
                <Package size={24} />
                <span>تعداد موجود در انبار</span>
              </div>
              <input
                type="text"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="quantity"
                className="outline-none bg-violet-100 text-purple-800 font-bold text-center p-1 rounded-md w-[100px]"
              />
            </div>
            {formik.touched.quantity && formik.errors.quantity && (
              <div className="text-red-500 font-semibold text-sm">
                {formik.errors.quantity}
              </div>
            )}
          </div>
          {/* PRICE */}
          <div className="flex flex-col gap-2 w-1/2">
            <div className="vertical-flex gap-5 p-3 rounded-lg shadow max-w-max">
              <div className="vertical-flex gap-2">
                <CurrencyDollar size={24} />
                <span>قیمت هر محصول</span>
              </div>
              <input
                type="text"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="price"
                className="outline-none bg-violet-100 text-purple-800 font-bold text-center p-1 rounded-md w-[100px]"
              />
            </div>
            {formik.touched.price && formik.errors.price && (
              <div className="text-red-500 font-semibold text-sm">
                {formik.errors.price}
              </div>
            )}
          </div>
        </div>
        <Button classes=" self-center" onClick={handleSaveChanges}>
          اعمال تغییرات
        </Button>
      </form>
    </Modal>
  );
}
