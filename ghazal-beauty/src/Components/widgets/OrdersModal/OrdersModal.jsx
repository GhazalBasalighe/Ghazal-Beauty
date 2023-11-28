import toPersianDigits from "../../../helpers/toPersianDigits";
import { Modal, Button, DynamicTable } from "../../base";
export function OrdersModal() {
  const tableData = {
    titles: ["کالا", "قیمت", "تعداد"],
    rows: [
      ["شوینده صورت", toPersianDigits("200.000"), toPersianDigits("5")],
      ["نمیدونم", toPersianDigits("100.000"), toPersianDigits("10")],
      ["میدونم", toPersianDigits("800.000"), toPersianDigits("8")],
    ],
  };

  return (
    <Modal title={"نمایش سفارش"}>
      <div className="flex flex-col gap-8">
        <div className="vertical-flex gap-7 mt-5">
          <div className="flex flex-col gap-5 font-semibold">
            <span>نام مشتری:</span>
            <span>آدرس:</span>
            <span>تلفن:</span>
            <span>زمان تحویل:</span>
            <span>زمان سفارش:</span>
          </div>
          <div className="flex flex-col gap-5 text-gray-800">
            <span>اکبر زمانی</span>
            <span>تهران خیابان شریعتی خیابان 2 پلاک 14 واحد 2</span>
            <span>0912222222</span>
            <span>1401/3/4</span>
            <span>1401/3/2</span>
          </div>
        </div>
        <DynamicTable titles={tableData.titles} rows={tableData.rows} />
        <Button classes=" self-center">تحویل داده شد</Button>
      </div>
    </Modal>
  );
}
