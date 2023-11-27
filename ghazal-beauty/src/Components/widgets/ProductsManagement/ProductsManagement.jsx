import { Button } from "../../base";

export function ProductsManagement() {
  const rows = [
    {
      imageSrc: "src/assets/faceWash.jpg",
      productName: "شوینده صورت",
      category: "محصولات پوستی",
    },
    {
      imageSrc: "src/assets/faceWash.jpg",
      productName: "شوینده صورت",
      category: "محصولات پوستی",
    },
    {
      imageSrc: "src/assets/faceWash.jpg",
      productName: "شوینده صورت",
      category: "محصولات پوستی",
    },
  ];

  return (
    <div className="flex flex-col justify-center px-12 py-8 gap-8">
      <div className="vertical-flex justify-between">
        <h1 className="text-4xl">مدیریت کالا</h1>
        <Button>افزودن کالا</Button>
      </div>
      <table className="border-separate rounded-2xl text-center">
        <thead className="bg-purple-300 font-semibold">
          <tr>
            <th className="p-3">تصویر محصول</th>
            <th className="p-3">نام محصول</th>
            <th className="p-3">دسته بندی</th>
            <th className="p-3">عملیات های مربوطه</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0 ? "bg-purple-200" : "bg-purple-100"
              }
            >
              <td className="p-3 vertical-flex justify-center">
                <img className="w-16 h-auto" src={row.imageSrc} alt="" />
              </td>
              <td className="p-3 align-middle">{row.productName}</td>
              <td className="p-3 align-middle">{row.category}</td>
              <td className="p-3 align-middle">
                <div className=" vertical-flex gap-3 justify-center ">
                  <span className="underline cursor-pointer text-indigo-500">
                    ویرایش
                  </span>
                  <span className="underline cursor-pointer text-indigo-500">
                    حذف
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
