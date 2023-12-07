import { useCheckboxContext } from "../../../../context/checkboxContext";

export function Checkbox() {
  const [state, dispatch] = useCheckboxContext();

  const handleCheckboxChange = (type) => {
    dispatch({ type });
  };

  return (
    <div className="vertical-flex gap-8 text-indigo-500">
      {/* ALL */}
      <div className="vertical-flex gap-3 cursor-pointer">
        <label htmlFor="allOrdersId" className="cursor-pointer">
          همه سفارشات
        </label>
        <input
          type="radio"
          name="allOrders"
          id="allOrdersId"
          checked={state.allChecked}
          onChange={() => handleCheckboxChange("ALL")}
          className="orders-category-checkbox"
        />
      </div>
      {/* PENDING ORDERS */}
      <div className="vertical-flex gap-3 cursor-pointer">
        <label htmlFor="pendingOrderId" className="cursor-pointer">
          سفارش‌های در انتظار
        </label>
        <input
          type="radio"
          name="pendingOrder"
          id="pendingOrderId"
          checked={state.pendingChecked}
          onChange={() => handleCheckboxChange("PENDING")}
          className="orders-category-checkbox"
        />
      </div>
      {/* DELIVERED ORDERS */}
      <div className="vertical-flex gap-3 cursor-pointer">
        <label htmlFor="deliveredOrderId" className="cursor-pointer">
          سفارش‌های تحویل داده شده
        </label>
        <input
          type="radio"
          name="deliveredOrder"
          id="deliveredOrderId"
          checked={state.deliveredChecked}
          onChange={() => handleCheckboxChange("DELIVERED")}
          className="orders-category-checkbox"
        />
      </div>
    </div>
  );
}
