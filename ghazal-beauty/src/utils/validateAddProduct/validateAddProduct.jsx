import * as Yup from "yup";
export const addProductValidationSchema = Yup.object().shape({
  productName: Yup.string("نام محصول نباید عدد باشد").required(
    "اسم محصول نمی‌تواند خالی باشد"
  ),
  productBrand: Yup.string("برند نمی‌تواند عدد باشد").required(
    "باید برند ذکر شود"
  ),
  productCategory: Yup.string().required("دسته بندی محصول را انتخاب کنید"),

  productSubCategory: Yup.string().required(
    "زیر دسته بندی محصول را انتخاب کنید"
  ),
  productQuantity: Yup.number("تعداد باید عدد باشد")
    .typeError()
    .required("تعداد محصول مشخص نیست"),
  productPrice: Yup.number("قیمت باید عدد باشد")
    .typeError()
    .required("قیمت محصول نمی‌تواند خالی باشد"),
  productDescription: Yup.mixed().required(
    "توضیحات محصول نمی‌تواند خالی باشد"
  ),
  productImg: Yup.mixed().required("تصویر محصول نمی‌تواند خالی باشد"),
});
