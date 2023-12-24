import { getInfoById } from "../../../helpers/getInfoById";
import toPersianDigits from "../../../helpers/toPersianDigits";
import { Modal, Button, DynamicTable } from "../../base";

export function OrdersModal({ closeModal, selectedOrder }) {
  console.log(selectedOrder);
  const tableData = {
    titles: ["کالا", "قیمت", "تعداد"],
    rows: [].concat(
      ...selectedOrder.products.map((product) => {
        const name = product.product.name;
        const price = toPersianDigits(product.product.price.toFixed(3));
        const count = toPersianDigits(product.count.toString());
        return [[name, price, count]];
      })
    ),
  };
  // FORMAT DATE TO LOCALE
  const formatPersianDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  };

  return (
    <Modal title={"نمایش سفارش"} closeModal={closeModal}>
      <div className="flex flex-col gap-8">
        <div className="vertical-flex gap-7 mt-5">
          <div className="flex flex-col gap-5 font-semibold">
            <span>نام مشتری:</span>
            <span>آدرس:</span>
            <span>تلفن:</span>
            <span>زمان سفارش:</span>
            <span>زمان تحویل:</span>
          </div>
          <div className="flex flex-col gap-5 text-gray-800">
            <span>
              {[
                selectedOrder.user.firstname,
                selectedOrder.user.lastname,
              ].join(" ")}
            </span>
            <span>{selectedOrder.user.address}</span>
            <span>{toPersianDigits(selectedOrder.user.phoneNumber)}</span>
            <span>{formatPersianDate(selectedOrder.createdAt)}</span>
            <span>{formatPersianDate(selectedOrder.deliveryDate)}</span>
          </div>
        </div>
        <DynamicTable titles={tableData.titles} rows={tableData.rows} />
        <span className="self-center">
          مبلغ کل سفارش:{" "}
          {toPersianDigits(selectedOrder.totalPrice.toFixed(3))} تومان
        </span>
        {selectedOrder.deliveryStatus === false && (
          <Button classes=" self-center">تحویل داده شد</Button>
        )}
        {selectedOrder.deliveryStatus === true && (
          <div className="flex flex-col items-center self-center">
            <img
              src="/src/assets/delivered.svg"
              alt="delivered order"
              width={140}
            />
            <span className=" text-violet-800 font-bold text-xl">
              این سفارش تحویل داده شده است
            </span>
          </div>
        )}
      </div>
    </Modal>
  );
}
