import { Button } from "../../base";

export function StockAndPriceManagement() {
  const rows = [
    {
      stock: "5",
      productName: "شوینده صورت",
      price: "200.000",
    },
    {
      stock: "10",
      productName: "نمیدونم",
      price: "100.000",
    },
    {
      stock: "1",
      productName: "شوینده صورت",
      price: "800.000",
    },
  ];

  return (
    <div className="flex flex-col justify-center px-12 py-8 gap-8">
      <div className="vertical-flex justify-between">
        <h1 className="text-4xl">مدیریت موجودی و قیمت‌ها</h1>
        <Button>ذخیره</Button>
      </div>
      <table className="border-separate rounded-2xl text-center">
        <thead className="bg-purple-300 font-semibold">
          <tr>
            <th className="p-3">کالا</th>
            <th className="p-3">قیمت</th>
            <th className="p-3">موجودی</th>
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
              <td className="p-3 align-middle">{row.productName}</td>
              <td className="p-3 align-middle">{row.price}</td>
              <td className="p-3 align-middle">{row.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
