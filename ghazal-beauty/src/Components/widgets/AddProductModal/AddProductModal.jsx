import { QuillEditor } from "./QuillEditor/QuillEditor";
import { Modal, Button } from "../../base";
import { FileInputField } from "./FileInputField";
import { useState } from "react";
import api from "../../../config/axiosInstance";
import { useQuery, useMutation } from "@tanstack/react-query";
import showToast from "../../../helpers/showToast";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Field, FormikProvider, useFormik } from "formik";
import { addProductValidationSchema } from "../../../utils";
import { SyncLoader } from "react-spinners";

export function AddProductModal({ closeModal, productId }) {
  const isEditing = !!productId;
  const [initialProductDescription, setInitialProductDescription] =
    useState("");

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: "categories",
    queryFn: async () => {
      const response = await api.get("/categories");
      return response.data.data.categories;
    },
  });

  const { data: subCategories, isLoading: subCategoriesLoading } =
    useQuery({
      queryKey: "subcategories",
      queryFn: async () => {
        const response = await api.get("/subcategories");
        return response.data.data.subcategories;
      },
    });

  // const { data: productData, isLoading: productLoading } = useQuery(
  //   ["product", productId],
  //   async () => {
  //     if (productId) {
  //       const response = await api.get(`/products/${productId}`);
  //       return response.data.data.product;
  //     }
  //     return null;
  //   }
  // );

  //   const dispatch = useDispatch();
  //   const productUpdateSignal = useSelector(
  //     (state) => state.auth.productUpdateSignal
  //   );

  //   const mutation = useMutation(async (values) => {
  //     const formData = new FormData();
  //     formData.append("name", values.productName);
  //     formData.append("brand", values.productBrand);
  //     formData.append("category", values.productCategory);
  //     formData.append("subcategory", values.productSubCategory);
  //     formData.append("description", values.productDescription);

  //     if (isEditing && values.productThumbnail) {
  //       formData.append("thumbnail", values.productThumbnail);
  //     } else if (!isEditing) {
  //       for (let i = 0; i < values.productImg.length; i++) {
  //         formData.append("images", values.productImg[i]);
  //       }
  //       formData.append("quantity", values.productQuantity);
  //       formData.append("price", values.productPrice);
  //     }

  //     const endpoint = isEditing ? `/products/${productId}` : "/products";
  //     if (isEditing) {
  //       await api.patch(endpoint, formData);
  //       showToast("محصول با موفقیت ویرایش شد");
  //     } else {
  //       await api.post(endpoint, formData);
  //       showToast("محصول با موفقیت اضافه شد");
  //     }

  //     dispatch(setProductUpdateSignal(!productUpdateSignal));
  //     closeModal("add");
  //   });

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

  //   if (productData) {
  //     initialValues.productName = productData.name;
  //     initialValues.productBrand = productData.brand;
  //     initialValues.productCategory = productData.category._id;
  //     initialValues.productSubCategory = productData.subcategory._id;
  //     initialValues.productImg = productData.images;
  //     setInitialProductDescription(productData.description);
  //   }

  const formik = useFormik({
    initialValues,
    validationSchema: addProductValidationSchema(isEditing),
    // onSubmit: (values) => mutation.mutate(values),
  });

  if (categoriesLoading || subCategoriesLoading) {
    return (
      <SyncLoader color="#a056b9" className="fixed top-1/2 left-1/2" />
    );
  }

  return (
    <FormikProvider value={formik}>
      <Toaster />
      <Modal
        title={isEditing ? "ویرایش کالا" : "افزودن کالا"}
        closeModal={closeModal}
      >
        {isEditing && (
          <span className="text-red-500">
            برای ویرایش قیمت و موجودی به جدول مربوطه مراجعه شود
          </span>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-4 my-5">
            <div className="vertical-flex gap-4">
              {/* PRODUCT NAME SECTION */}
              <div className="flex flex-col gap-2 w-3/4">
                <label htmlFor="productName">نام محصول:</label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  required
                  className="add-product-modal-input"
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.productName &&
                  formik.errors.productName && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.productName}
                    </div>
                  )}
              </div>

              {/* PRODUCT BRAND SECTION */}
              <div className="flex flex-col gap-2 w-1/4">
                <label htmlFor="productBrand">نام برند:</label>
                <input
                  type="text"
                  name="productBrand"
                  id="productBrand"
                  required
                  className="add-product-modal-input"
                  value={formik.values.productBrand}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.productBrand &&
                  formik.errors.productBrand && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.productBrand}
                    </div>
                  )}
              </div>
            </div>
            <div className="vertical-flex gap-8">
              {/* PRODUCT CATEGORY SELECT SECTION */}
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="productCategory">دسته بندی کالا:</label>
                <Field
                  as="select"
                  name="productCategory"
                  id="productCategory"
                  value={formik.values.productCategory}
                  className="add-product-modal-select"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="default" disabled selected>
                    انتخاب دسته بندی
                  </option>
                  {categories.map((item) => (
                    <option
                      key={item._id}
                      value={item._id}
                      style={{ fontFamily: "'Vazir', 'Poppins'" }}
                      className=" bg-purple-100"
                    >
                      محصولات {item.name}
                    </option>
                  ))}
                </Field>
                {formik.touched.productCategory &&
                  formik.errors.productCategory && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.productCategory}
                    </div>
                  )}
              </div>

              {/* PRODUCT SUBCATEGORY SELECT SECTION */}
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="productSubCategory">
                  زیر دسته بندی کالا:
                </label>
                <Field
                  as="select"
                  name="productSubCategory"
                  id="productSubCategory"
                  className="add-product-modal-select"
                  value={formik.values.productSubCategory}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="default" disabled selected>
                    انتخاب زیر دسته بندی
                  </option>
                  {subCategories.map((item) => (
                    <option
                      key={item._id}
                      value={item._id}
                      style={{ fontFamily: "'Vazir', 'Poppins'" }}
                      className=" bg-purple-100"
                    >
                      {item.name}
                    </option>
                  ))}
                </Field>
                {formik.touched.productSubCategory &&
                  formik.errors.productSubCategory && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.productSubCategory}
                    </div>
                  )}
              </div>
            </div>
            {!isEditing && (
              <div className="vertical-flex gap-4">
                {/* PRODUCT QUANTITY SECTION */}
                <div className="flex flex-col gap-2 w-1/2">
                  <label htmlFor="productQuantity">تعداد محصول:</label>
                  <input
                    type="text"
                    name="productQuantity"
                    id="productQuantity"
                    required
                    className="add-product-modal-input"
                    value={formik.values.productQuantity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.productQuantity &&
                    formik.errors.productQuantity && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.productQuantity}
                      </div>
                    )}
                </div>
                {/* PRODUCT PRICE SECTION */}
                <div className="flex flex-col gap-2 w-1/2">
                  <label htmlFor="productPrice">
                    قیمت محصول : (بدون در نظر گرفتن سه صفر انتها)
                  </label>
                  <input
                    type="text"
                    name="productPrice"
                    id="productPrice"
                    required
                    placeholder="قیمت به تومان "
                    className="add-product-modal-input"
                    value={formik.values.productPrice}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.productPrice &&
                    formik.errors.productPrice && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.productPrice}
                      </div>
                    )}
                </div>
              </div>
            )}

            {/* PRODUCT DESCRIPTION */}
            <div className="flex flex-col gap-2">
              <label htmlFor="textEditor">
                توضیحات: (پر کردن این فیلد الزامی می‌باشد)
              </label>
              <QuillEditor
                value={
                  formik.values.productDescription ||
                  initialProductDescription
                }
                onChange={(value) =>
                  formik.setFieldValue("productDescription", value)
                }
              />
            </div>
            {/* UPLOAD PRODUCT PIC SECTION */}
            <FileInputField
              onChange={(event) => {
                if (isEditing) {
                  formik.setFieldValue(
                    "productThumbnail",
                    event.target.files[0]
                  );
                } else {
                  formik.setFieldValue("productImg", event.target.files);
                }
              }}
              isEditing={isEditing}
            />
            <Button type="submit" classes=" self-center">
              {isEditing ? "ذخیره" : "افزودن"}
            </Button>
          </div>{" "}
        </form>
      </Modal>
    </FormikProvider>
  );
}
