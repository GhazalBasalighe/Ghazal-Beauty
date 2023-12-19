import * as Yup from "yup";
export const priceValidationSchema = Yup.object().shape({
  quantity: Yup.number()
    .typeError("موجودی باید یک عدد باشد")
    .positive("موجودی نمی‌تواند منفی باشد")
    .required(
      "تعداد نمی‌تواند 0 باشد. در صورت تمایل اقدام به حذف کالا از جدول محصولات نمایید"
    ),
  price: Yup.number()
    .typeError("قیمت باید یک عدد باشد")
    .positive("قیمت نمی‌تواند منفی باشد")
    .required("قیمت نمی‌تواند خالی باشد"),
});
