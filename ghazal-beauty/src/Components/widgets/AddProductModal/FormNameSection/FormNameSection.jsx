export function FormNameSection({
  value,
  onChange,
  onBlur,
  errorMessage,
}) {
  return (
    <div className="flex flex-col gap-2 w-3/4">
      <label htmlFor="productName">نام محصول:</label>
      <input
        type="text"
        name="productName"
        id="productName"
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
