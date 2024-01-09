import { Modal, Button } from "../../base";
import { useEffect, useState } from "react";
import api from "../../../config/axiosInstance";
import { useQuery, useMutation } from "@tanstack/react-query";
import showToast from "../../../helpers/showToast";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Field, FormikProvider, useFormik } from "formik";
import { addProductValidationSchema } from "../../../utils";
import { SyncLoader } from "react-spinners";
import { setProductUpdateSignal } from "../../../store/slices/authSlice";
import { FormNameSection } from "./FormNameSection/FormNameSection";
import { FormBrandSection } from "./FormBrandSection/FormBrandSection";
import { FileInputField } from "./FileInputField";
import { QuillEditor } from "./QuillEditor";

export function AddProductModal({ closeModal, productId }) {
  const isEditing = !!productId;
  const [initialProductDescription, setInitialProductDescription] =
    useState("");

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

  // CATEGORIES
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("/categories");
      return response.data.data.categories;
    },
  });

  //SUBCATEGORIES
  const { data: subCategories, isLoading: subCategoriesLoading } =
    useQuery({
      queryKey: ["subcategories"],
      queryFn: async () => {
        const response = await api.get("/subcategories");
        return response.data.data.subcategories;
      },
    });

  //PRODUCT INFO IN EDIT MODE
  const { data: productData, isLoading: productLoading } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      if (productId) {
        const response = await api.get(`/products/${productId}`);
        return response.data.data.product;
      }
      return null;
    },
  });

  // FILL IN THE INPUTS WITH PRODUCT DATA
  useEffect(() => {
    if (productData) {
      formik.setValues({
        ...formik.values,
        productName: productData.name,
        productBrand: productData.brand,
        productCategory: productData.category._id,
        productSubCategory: productData.subcategory._id,
        productImg: productData.images,
        productDescription: productData.description,
      });
      setInitialProductDescription(productData.description);
    } else {
      formik.resetForm();
    }
  }, [productData, isEditing]);

  const dispatch = useDispatch();
  const productUpdateSignal = useSelector(
    (state) => state.auth.productUpdateSignal
  );

  const { mutate } = useMutation({
    mutationFn: async (values) => {
      const formData = new FormData();
      formData.append("name", values.productName);
      formData.append("brand", values.productBrand);
      formData.append("category", values.productCategory);
      formData.append("subcategory", values.productSubCategory);
      formData.append("description", values.productDescription);

      if (isEditing && values.productThumbnail) {
        formData.append("thumbnail", values.productThumbnail);
      } else if (!isEditing) {
        for (let i = 0; i < values.productImg.length; i++) {
          formData.append("images", values.productImg[i]);
        }
        formData.append("quantity", values.productQuantity);
        formData.append("price", values.productPrice);
      }
      const endpoint = isEditing ? `/products/${productId}` : "/products";
      if (isEditing) {
        await api.patch(endpoint, formData);
      } else {
        await api.post(endpoint, formData);
      }
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema: addProductValidationSchema(isEditing),
    onSubmit: (values) =>
      mutate(values, {
        onSuccess: () => {
          showToast(
            isEditing
              ? "محصول با موفقیت ویرایش شد"
              : "محصول با موفقیت اضافه شد"
          );
          dispatch(setProductUpdateSignal(!productUpdateSignal));
          closeModal("add");
        },
        onError: () => {
          showToast("خطایی پیش آمده. دوباره امتحان کنید", true);
        },
      }),
  });

  if (categoriesLoading || subCategoriesLoading || productLoading) {
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
              <FormNameSection
                value={formik.values.productName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={
                  formik.touched.productName &&
                  formik.errors.productName && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.productName}
                    </div>
                  )
                }
              />
              {/* PRODUCT BRAND SECTION */}
              <FormBrandSection
                value={formik.values.productBrand}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={
                  formik.touched.productBrand &&
                  formik.errors.productBrand && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.productBrand}
                    </div>
                  )
                }
              />
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
