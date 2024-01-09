import { Modal, Button } from "../../base";
import { useEffect, useState } from "react";
import api from "../../../config/axiosInstance";
import { useQuery, useMutation } from "@tanstack/react-query";
import showToast, { dismissToast } from "../../../helpers/showToast";
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
import { FormCategorySection } from "./FormCategorySection/FormCategorySection";
import { FormSubcategorySection } from "./FormSubcategorySection/FormSubcategorySection";
import { FormQuantitySection } from "./FormQuantitySection/FormQuantitySection";
import { FormPriceSection } from "./FormPriceSection/FormPriceSection";

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
      setInitialProductDescription("");
    }
  }, [productData, isEditing]);

  const dispatch = useDispatch();
  const productUpdateSignal = useSelector(
    (state) => state.auth.productUpdateSignal
  );

  const formik = useFormik({
    initialValues,
    validationSchema: addProductValidationSchema(isEditing),
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: async () => {
          showToast(
            isEditing
              ? "محصول با موفقیت ویرایش شد"
              : "محصول با موفقیت اضافه شد"
          );
          dispatch(setProductUpdateSignal(!productUpdateSignal));
          setTimeout(() => {
            closeModal("add");
            dismissToast();
          }, 600);
        },
        onError: () => {
          showToast("خطایی پیش آمده. دوباره امتحان کنید", true);
        },
      });
    },
  });

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
              <FormCategorySection
                value={formik.values.productCategory}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                categories={categories}
                errorMessage={
                  formik.touched.productCategory &&
                  formik.errors.productCategory && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.productCategory}
                    </div>
                  )
                }
              />
              {/* PRODUCT SUBCATEGORY SELECT SECTION */}
              <FormSubcategorySection
                value={formik.values.productSubCategory}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                subCategories={subCategories}
                errorMessage={
                  formik.touched.productSubCategory &&
                  formik.errors.productSubCategory && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.productSubCategory}
                    </div>
                  )
                }
              />
            </div>
            {!isEditing && (
              <div className="vertical-flex gap-4">
                {/* PRODUCT QUANTITY SECTION */}
                <FormQuantitySection
                  value={formik.values.productQuantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.touched.productQuantity &&
                    formik.errors.productQuantity && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.productQuantity}
                      </div>
                    )
                  }
                />
                {/* PRODUCT PRICE SECTION */}
                <FormPriceSection
                  value={formik.values.productPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.touched.productPrice &&
                    formik.errors.productPrice && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.productPrice}
                      </div>
                    )
                  }
                />
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
