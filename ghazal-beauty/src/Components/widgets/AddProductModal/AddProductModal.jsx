import { Modal, Button } from "../../base";
import { FileInputField } from "./FileInputField";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import api from "../../../config/axiosInstance";
import { useFormik, Field, FormikProvider } from "formik";
import { addProductValidationSchema } from "../../../utils";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import LinkTool from "@editorjs/link";

export function AddProductModal({ closeModal, productId }) {
  const isEditing = !!productId;
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const ejInstance = useRef();
  const isReady = useRef(false);

  // EDITOR JS INSTANCE
  useEffect(() => {
    if (!isReady.current) {
      const editorConfig = {
        holder: "textEditor",
        placeholder: "توضیحات خود را بنویسید",
        tools: {
          header: {
            class: Header,
            config: {
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 2,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+O",
            config: {
              quotePlaceholder: "نقل و قول...",
              captionPlaceholder: "از ...",
            },
          },
          link: {
            class: LinkTool,
          },
          onReady: {
            class: function OnReadyTool() {
              ejInstance.current = editor;
              this.constructable = function () {
                return {
                  render: () => {
                    // Your onReady logic here
                    console.log("Editor is ready!");
                  },
                };
              };
            },
          },
        },

        instanceReady: (editor) => {
          ejInstance.current = editor;
          isReady.current = true;
        },
        data: {},
      };

      const editor = new EditorJS(editorConfig);
      isReady.current = true;
    }
  }, []);

  //SAVE EDITOR JS OUTPUT
  const handleSave = async () => {
    try {
      const outputData = await ejInstance.current.save();
      const description = JSON.stringify(outputData.blocks);
      console.log(description);
      formik.setFieldValue("productDescription", description);
    } catch (error) {
      console.error("Error saving EditorJS output:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      productName: "",
      productBrand: "",
      productCategory: "",
      productSubCategory: "",
      productQuantity: "",
      productPrice: "",
      productImg: [],
      // productThumbnail: null,
    },
    validationSchema: addProductValidationSchema,
    onSubmit: async (values) => {
      await handleSave();
      try {
        const formData = new FormData();
        formData.append("name", values.productName);
        formData.append("brand", values.productBrand);
        formData.append("category", values.productCategory);
        formData.append("subcategory", values.productSubCategory);
        formData.append("quantity", values.productQuantity);
        formData.append("price", values.productPrice);
        formData.append("description", values.productDescription);
        formData.append("images", values.productImg);

        // formData.append("thumbnail", values.productThumbnail);

        console.log(formData);
        const response = await api.post("/products", formData);

        console.log("Item added successfully:", response.data);

        // Close the modal or perform other actions as needed
        // closeModal();
      } catch (error) {
        console.error("Error adding item:", error);
      }
    },
  });
  console.log(formik.errors);
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
          const productData = productReq.data.data;
          formik.setValues({
            productName: productData.product.name,
            productBrand: productData.product.brand,
            productCategory: productData.product.category._id,
            productSubCategory: productData.product.subcategory._id,
            productQuantity: productData.product.quantity,
            productPrice: productData.product.price,
            productDescription: productData.product.description,
            productImg: productData.product.images,
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
                />
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
                      value={item._id}
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
                      value={item._id}
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
              <div
                className="add-product-modal-textEditor"
                id="textEditor"
              ></div>
            </div>
            {/* UPLOAD PRODUCT PIC SECTION */}
            <FileInputField
              onChange={(event) =>
                formik.setFieldValue("productImg", event.target.files[0])
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
