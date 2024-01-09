export function FormPriceSection({
  value,
  onChange,
  onBlur,
  errorMessage,
}) {
  return (
    <div className="flex flex-col gap-2 w-1/2">
      <label htmlFor="productPrice">قیمت محصول :</label>
      <input
        type="text"
        name="productPrice"
        id="productPrice"
        required
        placeholder="قیمت به تومان "
        className="add-product-modal-input"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errorMessage}
    </div>
  );
}
