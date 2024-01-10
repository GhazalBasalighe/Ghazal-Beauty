import { Field } from "formik";

export function FormSubcategorySection({
  value,
  onChange,
  onBlur,
  errorMessage,
  subCategories,
}) {
  return (
    <div className="flex flex-col gap-2 w-1/2">
      <label htmlFor="productSubCategory">زیر دسته بندی کالا:</label>
      <Field
        as="select"
        name="productSubCategory"
        id="productSubCategory"
        className="add-product-modal-select"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
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
      {errorMessage}
    </div>
  );
}
