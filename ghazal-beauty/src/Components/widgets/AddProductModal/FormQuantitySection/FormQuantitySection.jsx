export function FormQuantitySection({
  value,
  onChange,
  onBlur,
  errorMessage,
}) {
  return (
    <div className="flex flex-col gap-2 w-1/2">
      <label htmlFor="productQuantity">تعداد محصول:</label>
      <input
        type="text"
        name="productQuantity"
        id="productQuantity"
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
