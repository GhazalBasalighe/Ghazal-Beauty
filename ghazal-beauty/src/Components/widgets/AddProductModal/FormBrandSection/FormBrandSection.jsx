export function FormBrandSection({
  value,
  onChange,
  onBlur,
  errorMessage,
}) {
  return (
    <div className="flex flex-col gap-2 w-1/4">
      <label htmlFor="productBrand">نام برند:</label>
      <input
        type="text"
        name="productBrand"
        id="productBrand"
        required
        className="add-product-modal-input"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errorMessage}
    </div>
  );
}
