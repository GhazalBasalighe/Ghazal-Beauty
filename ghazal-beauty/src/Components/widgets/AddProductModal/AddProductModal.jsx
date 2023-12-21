import { Modal, Button } from "../../base";
import { TextEditor } from "./TextEditor";
import { FileInputField } from "./FileInputField";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../config/axiosInstance";
import { useFormik, Field, FormikProvider } from "formik";
import { addProductValidationSchema } from "../../../utils";

export function AddProductModal({ closeModal, productId }) {
  const isEditing = !!productId;
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    subcategory: "",
    description: "",
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      productBrand: "",
      productCategory: "",
      productSubCategory: "",
      productQuantity: "",
      productPrice: "",
      // productDescription: "",
      // productImg: null,
      // productThumbnail: null,
    },
    validationSchema: addProductValidationSchema,
    onSubmit: () => {
      console.log("come onnn please submit :/");
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await axios.get(
          "http://localhost:8000/api/categories"
        );
        setCategories(categoriesResponse.data.data.categories);
        const subcategoriesResponse = await axios.get(
          "http://localhost:8000/api/subcategories"
        );
        setSubCategories(subcategoriesResponse.data.data.subcategories);
        if (productId) {
          const productReq = await api.get(`/products/${productId}`);
          setProduct(productReq.data.data.product);
          const productData = productReq.data.data;
          formik.setValues({
            productName: productData.product.name,
            productBrand: productData.product.brand,
            productCategory: productData.product.category.name,
            productSubCategory: productData.product.subcategory.name,
            productQuantity: productData.product.quantity,
            productPrice: productData.product.price,
            productDescription: productData.product.description,
            // productImg: null,
            // productThumbnail: null,
          });
        }
      } catch (error) {
        console.error(
          "Error fetching categories and subcategories:",
          error
        );
      }
    };

    fetchCategories();
  }, [productId]);

  return (
    <FormikProvider value={formik}>
      <Modal
        title={isEditing ? "ویرایش کالا" : "افزودن کالا"}
        closeModal={closeModal}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-5 my-5">
            <div className="vertical-flex gap-4">
              {/* PRODUCT NAME SECTION */}
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="productName">نام محصول:</label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  required
                  className="add-product-modal-input"
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                />
              </div>
              {/* PRODUCT BRAND SECTION */}
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="productBrand">نام برند:</label>
                <input
                  type="text"
                  name="productBrand"
                  id="productBrand"
                  required
                  className="add-product-modal-input"
                  value={formik.values.productBrand}
                  onChange={formik.handleChange}
                />
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
                  className="add-product-modal-select"
                >
                  {categories.map((item) => (
                    <option
                      key={item._id}
                      value={item.name}
                      style={{ fontFamily: "'Vazir', 'Poppins'" }}
                      className=" bg-purple-100"
                    >
                      محصولات {item.name}
                    </option>
                  ))}
                </Field>
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
                >
                  {subCategories.map((item) => (
                    <option
                      key={item._id}
                      value={item.name}
                      style={{ fontFamily: "'Vazir', 'Poppins'" }}
                      className=" bg-purple-100"
                    >
                      {item.name}
                    </option>
                  ))}
                </Field>
              </div>
            </div>
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
                />
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
                />
              </div>
            </div>
            {/* PRODUCT DESCRIPTION */}
            <div className="flex flex-col gap-2">
              <label htmlFor="textEditor">توضیحات:</label>
              <TextEditor
                id="textEditor"
                description={product.description}
                onChange={(value) =>
                  formik.setFieldValue("productDescription", value)
                }
              />
            </div>
            {/* UPLOAD PRODUCT PIC SECTION */}
            <FileInputField
              onChange={(event) =>
                formik.setFieldValue(
                  "productThumbnail",
                  event.target.files[0]
                )
              }
            />
            <Button type="submit" classes=" self-center">
              {isEditing ? "ذخیره" : "افزودن"}
            </Button>
          </div>
        </form>
      </Modal>
    </FormikProvider>
  );
}
