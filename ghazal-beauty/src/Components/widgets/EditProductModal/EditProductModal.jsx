import { useMutation } from "@tanstack/react-query";
import api from "../../../config/axiosConfig";
import { ProductModalForm } from "../ProductModalForm/ProductModalForm";

export function EditProductModal({ closeModal, productId }) {
  const initialValues = {
    productName: "",
    productBrand: "",
    productCategory: "default",
    productSubCategory: "default",
    productQuantity: "",
    productPrice: "",
    productImg: [],
    productThumbnail: "",
    productDescription: "",
  };

  const mutationFn = (productId) => {
    return useMutation({
      mutationFn: async (values) => {
        const formData = new FormData();
        formData.append("name", values.productName);
        formData.append("brand", values.productBrand);
        formData.append("category", values.productCategory);
        formData.append("subcategory", values.productSubCategory);
        formData.append("description", values.productDescription);

        if (values.productThumbnail) {
          formData.append("thumbnail", values.productThumbnail);
        }
        await api.patch(`/products/${productId}`, formData);
      },
    });
  };

  return (
    <ProductModalForm
      closeModal={closeModal}
      productId={productId}
      initialValues={initialValues}
      onSubmitSuccessMessage="محصول با موفقیت ویرایش شد"
      onSubmitErrorMessage="خطایی پیش آمده. دوباره امتحان کنید"
      mutationFn={mutationFn}
    />
  );
}
