import { useMutation } from "@tanstack/react-query";
import api from "../../../config/axiosInstance";
import { ProductModalForm } from "../ProductModalForm/ProductModalForm";

export function AddProductModal({ closeModal }) {
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

  const mutationFn = () => {
    return useMutation({
      mutationFn: async (values) => {
        const formData = new FormData();
        formData.append("name", values.productName);
        formData.append("brand", values.productBrand);
        formData.append("category", values.productCategory);
        formData.append("subcategory", values.productSubCategory);
        formData.append("description", values.productDescription);
        for (let i = 0; i < values.productImg.length; i++) {
          formData.append("images", values.productImg[i]);
        }
        formData.append("quantity", values.productQuantity);
        formData.append("price", values.productPrice);

        await api.post("/products", formData);
      },
    });
  };

  return (
    <ProductModalForm
      closeModal={closeModal}
      productId={null}
      initialValues={initialValues}
      onSubmitSuccessMessage="محصول با موفقیت اضافه شد"
      onSubmitErrorMessage="خطایی پیش آمده. دوباره امتحان کنید"
      mutationFn={mutationFn}
      fileOnChange={(event) =>
        formik.setFieldValue("productImg", event.target.files)
      }
    />
  );
}
