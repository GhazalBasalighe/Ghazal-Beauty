import { Modal, Button } from "../../base";
import { TextEditor } from "./TextEditor";
import { FileInputField } from "./FileInputField";
export function AddProductModal() {
  return (
    <Modal title={"افزودن / ویرایش کالا"}>
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
          />
        </div>
        {/* PRODUCT CATEGORY SELECT SECTION */}
        <div className="flex flex-col gap-2">
          <label htmlFor="">دسته بندی کالا:</label>
          <select name="" id="" className="add-product-modal-select">
            <option className=" bg-purple-100" value="hairProducts">
              محصولات مویی
            </option>
            <option className=" bg-purple-100" value="skinProducts">
              محصولات پوستی
            </option>
            <option className=" bg-purple-100" value="cosmeticsProdcuts">
              محصولات آرایشی
            </option>
          </select>
        </div>
        {/* PRODUCT DESCRIPTION */}
        <div className="flex flex-col gap-2">
          <label htmlFor="">توضیحات:</label>
          <TextEditor />
        </div>
        {/* UPLOAD PRODUCT PIC SECTION */}
        <FileInputField />
        <Button classes=" self-center">ذخیره</Button>
      </div>
    </Modal>
  );
}
