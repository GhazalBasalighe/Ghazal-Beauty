import { ProductGroupPreview } from "../../widgets";

export function ProductContainer({ children }) {
  return (
    <div className="mt-4 pt-4 border-solid border-t-4 border-indigo-200">
      <ProductGroupPreview /> <ProductGroupPreview />{" "}
    </div>
  );
}
