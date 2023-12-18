import { Modal, Button } from "../../base";
import { TextEditor } from "./TextEditor";
import { FileInputField } from "./FileInputField";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../config/axiosInstance";

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
    <Modal
      title={isEditing ? "ویرایش کالا" : "افزودن کالا"}
      closeModal={closeModal}
    >
      <div className="flex flex-col gap-5 my-5">
        {/* PRODUCT NAME SECTION */}
        <div className="flex flex-col gap-2">
          <label htmlFor="productNameId">نام محصول:</label>
          <input
            type="text"
            name="productName"
            id="productNameId"
            required
            className="add-product-modal-input"
            value={product.name}
          />
        </div>
        <div className="vertical-flex gap-8">
          {/* PRODUCT CATEGORY SELECT SECTION */}
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="">دسته بندی کالا:</label>
            <select
              name="productCategory"
              id="productCategoryId"
              className="add-product-modal-select"
              value={product.category.name}
            >
              <option selected disabled hidden value="selectPlease">
                گروه را انتخاب کنید 👇
              </option>
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
            </select>
          </div>
          {/* PRODUCT SUBCATEGORY SELECT SECTION */}
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="">زیر دسته بندی کالا:</label>
            <select
              name="productSubCategory"
              id="productSubCategoryId"
              className="add-product-modal-select"
              value={product.subcategory.name}
            >
              <option selected disabled hidden value="selectPlease">
                زیر گروه را انتخاب کنید 👇
              </option>
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
            </select>
          </div>
        </div>

        {/* PRODUCT DESCRIPTION */}
        <div className="flex flex-col gap-2">
          <label htmlFor="">توضیحات:</label>
          <TextEditor description={product.description} />
        </div>
        {/* UPLOAD PRODUCT PIC SECTION */}
        <FileInputField />
        <Button classes=" self-center">
          {isEditing ? "ذخیره" : "افزودن"}
        </Button>
      </div>
    </Modal>
  );
}
