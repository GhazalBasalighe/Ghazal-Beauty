import { Upload } from "@phosphor-icons/react";

export function FileInputField({ onChange, isEditing }) {
  const informMessage = isEditing ? (
    <span className="font-bold text-lg">
      پیش نمایش محصول را بارگذاری کنید
    </span>
  ) : (
    <span className="font-bold text-lg">تصویر محصول را بارگذاری کنید</span>
  );

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="productImg" className="add-product-modal-file-field">
        <div className=" vertical-flex justify-center gap-2">
          {informMessage}
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
        onChange={(event) => {
          if (event.target.files.length > 0) {
            onChange(event);
          }
        }}
      />
    </div>
  );
}
