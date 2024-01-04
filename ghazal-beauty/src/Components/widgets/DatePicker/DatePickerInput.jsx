import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Button } from "../../base";
import { useDispatch, useSelector } from "react-redux";
import { setDeliveryDate } from "../../../store/slices/cartSlice";
import api from "../../../config/axiosInstance";

export function DatePickerInput() {
  const dispatch = useDispatch();
  const orderId = useSelector((state) => state.cart.orderId);
  const deliveryDate = useSelector((state) => state.cart.deliveryDate);

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = date.toDate().toISOString();
      dispatch(setDeliveryDate(formattedDate));
    } else {
      const now = Date.now();
      const formattedDate = now.toISOString();
      dispatch(setDeliveryDate(formattedDate));
    }
  };

  const handleClick = async () => {
    try {
      await api.patch(`/orders/${orderId}`, {
        deliveryDate,
      });
    } catch (error) {
      console.error(error);
    }
    window.location.href = "/mock_payment";
  };

  return (
    <div className="p-10 vertical-flex items-center">
      <div className="flex flex-col gap-5 h-[50vh]">
        <h1 className="mb-10 text-4xl font-bold self-start">
          انتخاب تاریخ تحویل سفارش
        </h1>
        {/* DELIVERY DATE SECTION */}
        <div className="flex flex-col gap-2">
          <label htmlFor="hijriDatePicker" className="text-lg font-bold">
            تاریخ تحویل:
          </label>
          <DatePicker
            id="hijriDatePicker"
            inputClass="user-info-input"
            calendar={persian}
            locale={persian_fa}
            arrow={false}
            className="user-info-input"
            onChange={handleDateChange}
          />
        </div>
        {/* HINT SECTION */}
        <span>در صورت عدم تعیین ، تاریخ امروز انتخاب خواهد شد</span>
        {/* BUTTON SECTION */}
        <Button classes=" self-center mt-20" onClick={handleClick}>
          ادامه فرایند خرید
        </Button>
      </div>
      <img
        src="src/assets/pickDate.svg"
        alt="calender picker"
        width={780}
      />
    </div>
  );
}
