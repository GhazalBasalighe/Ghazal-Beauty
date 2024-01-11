import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FormikProvider, useFormik } from "formik";
import { SyncLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";
import api from "../../../config/axiosConfig";
import { addProductValidationSchema } from "../../../utils";
import showToast, { dismissToast } from "../../../helpers/showToast";
import { Modal, Button, QuillEditor, FileInputField } from "../../base";
import {
  FormBrandSection,
  FormCategorySection,
  FormSubcategorySection,
  FormNameSection,
  FormQuantitySection,
  FormPriceSection,
} from "../../base";
import { useDispatch, useSelector } from "react-redux";
import { setProductUpdateSignal } from "../../../store/slices/authSlice";

export function ProductModalForm({
  closeModal,
  productId,
  initialValues,
  onSubmitSuccessMessage,
  onSubmitErrorMessage,
  mutationFn,
}) {
  const [initialProductDescription, setInitialProductDescription] =
    useState("");

  const dispatch = useDispatch();
  const productUpdateSignal = useSelector(
    (state) => state.auth.productUpdateSignal
  );

  //GET CATEGORIES
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("/categories");
      return response.data.data.categories;
    },
  });

  //GET SUBCATEGORIES
  const { data: subCategories, isLoading: subCategoriesLoading } =
    useQuery({
      queryKey: ["subcategories"],
      queryFn: async () => {
        const response = await api.get("/subcategories");
        return response.data.data.subcategories;
      },
    });

  //GET PRODUCT INFO IN EDIT MODE
  const { data: productData, isLoading: productLoading } = useQuery({
    queryKey: ["productId"],
    queryFn: async () => {
      if (productId) {
        const response = await api.get(`/products/${productId}`);
        return response.data.data.product;
      }
      return null;
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema: addProductValidationSchema(productId ? true : false),
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: async () => {
          showToast(onSubmitSuccessMessage);
          setTimeout(() => {
            closeModal(productId ? "edit" : "add");
            dismissToast();
          }, 600);
          dispatch(setProductUpdateSignal(!productUpdateSignal));
        },
        onError: () => {
          showToast(onSubmitErrorMessage, true);
        },
      });
    },
  });
  const { mutate } = mutationFn(productId);

  useEffect(() => {
    if (productData) {
      formik.setValues({
        ...formik.values,
        productName: productData.name,
        productBrand: productData.brand,
        productCategory: productData.category._id,
        productSubCategory: productData.subcategory._id,
        productDescription: productData.description,
      });
      setInitialProductDescription(productData.description);
    } else {
      formik.resetForm();
      setInitialProductDescription("");
    }
  }, [productData]);

  if (categoriesLoading || subCategoriesLoading || productLoading) {
    return (
      <SyncLoader color="#a056b9" className="fixed top-1/2 left-1/2" />
    );
  } else {
    return (
      <FormikProvider value={formik}>
        <Toaster />
        <Modal
          title={productId ? "ویرایش کالا" : "افزودن کالا"}
          closeModal={closeModal}
        >
          <span className="text-red-500">
            {productId
              ? "برای ویرایش قیمت و موجودی به جدول مربوطه مراجعه شود"
              : ""}
          </span>
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
              {!productId && (
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
                  if (!!productId) {
                    console.log("hi");
                    formik.setFieldValue(
                      "productThumbnail",
                      event.target.files[0]
                    );
                  } else {
                    formik.setFieldValue("productImg", event.target.files);
                  }
                }}
                isEditing={!!productId}
              />
              <Button type="submit" classes=" self-center">
                {productId ? "ویرایش" : "افزودن"}
              </Button>
            </div>
          </form>
        </Modal>
      </FormikProvider>
    );
  }
}
