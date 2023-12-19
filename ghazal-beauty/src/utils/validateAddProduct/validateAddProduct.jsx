import * as Yup from "yup";
export const addProductValidationSchema = Yup.object().shape({
  productName: Yup.string("نام محصول نباید عدد باشد").required(
    "اسم محصول نمی‌تواند خالی باشد"
  ),
  productCategory: Yup.string("نام محصول نباید عدد باشد").required(
    "دسته بندی محصول را انتخاب کنید"
  ),
  productSubCategory: Yup.string("نام محصول نباید عدد باشد").required(
    "زیر دسته بندی محصول را انتخاب کنید"
  ),
  productDescription: Yup.string("نام محصول نباید عدد باشد").required(
    "توضیحات محصول نمی‌تواند خالی باشد"
  ),
  productImg: Yup.mixed().required("تصویر محصول نمی‌تواند خالی باشد"),
  productThumbnail: Yup.mixed().required(
    "پیش نمایش محصول نمی‌تواند خالی باشد"
  ),
});
