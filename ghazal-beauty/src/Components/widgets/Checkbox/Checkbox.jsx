import { useState } from "react";

export function Checkbox() {
  const [pendingChecked, setPendingChecked] = useState(true);
  const [deliveredChecked, setDeliveredChecked] = useState(false);

  const handlePendingChange = () => {
    setPendingChecked(true);
    setDeliveredChecked(false);
  };

  const handleDeliveredChange = () => {
    setPendingChecked(false);
    setDeliveredChecked(true);
  };
  return (
    <div className="vertical-flex gap-8 text-indigo-500">
      <div className="vertical-flex gap-3 cursor-pointer">
        <label htmlFor="pendingOrderId" className="cursor-pointer">
          سفارش‌های در انتظار
        </label>
        <input
          type="radio"
          name="pendingOrder"
          id="pendingOrderId"
          checked={pendingChecked}
          onChange={handlePendingChange}
          className="orders-category-checkbox"
        />
      </div>
      <div className="vertical-flex gap-3 cursor-pointer">
        <label htmlFor="deliveredOrderId" className="cursor-pointer">
          سفارش‌های تحویل داده شده
        </label>
        <input
          type="radio"
          name="deliveredOrder"
          id="deliveredOrderId"
          checked={deliveredChecked}
          onChange={handleDeliveredChange}
          className="orders-category-checkbox"
        />
      </div>
    </div>
  );
}
