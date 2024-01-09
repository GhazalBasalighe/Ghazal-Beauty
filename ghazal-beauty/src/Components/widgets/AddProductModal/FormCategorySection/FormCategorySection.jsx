import { Field } from "formik";

export function FormCategorySection({
  value,
  onChange,
  onBlur,
  errorMessage,
  categories,
}) {
  return (
    <div className="flex flex-col gap-2 w-1/2">
      <label htmlFor="productCategory">دسته بندی کالا:</label>
      <Field
        as="select"
        name="productCategory"
        id="productCategory"
        value={value}
        className="add-product-modal-select"
        onChange={onChange}
        onBlur={onBlur}
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
      {errorMessage}
    </div>
  );
}
