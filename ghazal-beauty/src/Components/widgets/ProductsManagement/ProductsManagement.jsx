import { Button, DynamicTable } from "../../base";

export function ProductsManagement() {
  const tableData = {
    titles: ["تصویر محصول", "نام محصول", "دسته بندی", "عملیات های مربوطه"],
    rows: [
      [
        <img src="src/assets/faceWash.jpg" alt="" width={60} />,
        "شوینده صورت",
        "محصولات پوستی",
        <>
          <span className="underline cursor-pointer text-indigo-500">
            ویرایش
          </span>
          <span className="underline cursor-pointer text-indigo-500">
            حذف
          </span>
        </>,
      ],
      [
        <img src="src/assets/faceWash.jpg" alt="" width={60} />,
        "شوینده صورت",
        "محصولات پوستی",
        <>
          <span className="underline cursor-pointer text-indigo-500">
            ویرایش
          </span>
          <span className="underline cursor-pointer text-indigo-500">
            حذف
          </span>
        </>,
      ],
      [
        <img src="src/assets/faceWash.jpg" alt="" width={60} />,
        "شوینده صورت",
        "محصولات پوستی",
        <>
          <span className="underline cursor-pointer text-indigo-500">
            ویرایش
          </span>
          <span className="underline cursor-pointer text-indigo-500">
            حذف
          </span>
        </>,
      ],
    ],
  };

  return (
    <div className="flex flex-col justify-center px-20 py-8 gap-8 mt-10">
      <div className="vertical-flex justify-between">
        <h1 className="text-4xl">مدیریت کالا</h1>
        <Button>افزودن کالا</Button>
      </div>
      <DynamicTable titles={tableData.titles} rows={tableData.rows} />
    </div>
  );
}
