import * as Yup from "yup";

export const addProductValidationSchema = (isEditing = false) => {
  let schema = Yup.object().shape({
    productName: Yup.string().required("نام محصول نمی‌تواند خالی باشد"),
    productBrand: Yup.string().required("برند نمی‌تواند خالی باشد"),
    productCategory: Yup.string().required(
      "دسته بندی محصول را انتخاب کنید"
    ),
    productSubCategory: Yup.string().required(
      "زیر دسته بندی محصول را انتخاب کنید"
    ),
    productDescription: Yup.string().required(
      "توضیحات محصول نمی‌تواند خالی باشد"
    ),
  });

  if (isEditing) {
    schema = schema.shape({
      productThumbnail: Yup.mixed().notRequired(
        "تصویر محصول نمی‌تواند خالی باشد"
      ),
    });
    schema = schema.shape({
      productQuantity: Yup.number()
        .typeError("تعداد باید عدد باشد")
        .notRequired("تعداد محصول مشخص نیست"),
    });
    schema = schema.shape({
      productPrice: Yup.number()
        .typeError("قیمت باید عدد باشد")
        .notRequired("قیمت محصول نمی‌تواند خالی باشد"),
    });
    schema = schema.shape({
      productImg: Yup.mixed().notRequired(),
    });
  } else {
    schema = schema.shape({
      productImg: Yup.mixed().required("تصویر محصول نمی‌تواند خالی باشد"),
    });
    schema = schema.shape({
      productQuantity: Yup.number()
        .typeError("تعداد باید عدد باشد")
        .required("تعداد محصول مشخص نیست"),
    });
    schema = schema.shape({
      productPrice: Yup.number()
        .typeError("قیمت باید عدد باشد")
        .required("قیمت محصول نمی‌تواند خالی باشد"),
    });
    schema = schema.shape({
      productThumbnail: Yup.mixed().notRequired(),
    });
  }

  return schema;
};
