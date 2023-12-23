import { Upload } from "@phosphor-icons/react";

export function FileInputField({ onChange }) {
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="productImg" className="add-product-modal-file-field">
        <div className=" vertical-flex justify-center gap-2">
          <span className="font-bold text-lg">
            تصویر محصول را بارگذاری کنید
          </span>
          <Upload size={30} />
        </div>
        <div className="flex flex-col gap-1 items-center">
          <span className="text-sm">
            توجه فرمایید که فرمت عکس یکی از موارد زیر باشد:
          </span>
          <span className="text-xs font-bold">JPG / PNG / SVG / JPEG</span>
        </div>
      </label>
      <input
        type="file"
        name="productImg"
        id="productImg"
        className="hidden"
        accept="image/png, image/jpeg, image/svg, image/jpg"
        multiple
        onChange={onChange}
      />
    </div>
  );
}
