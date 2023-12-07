import { SmileySad } from "@phosphor-icons/react";
export function EmptyTable() {
  return (
    <div className="empty-table">
      <h1 className="vertical-flex gap-2">
        <span className="text-3xl font-bold text-indigo-500 ">
          جدول خالی است
        </span>
        <SmileySad className="bg-indigo-300 rounded-full" size={40} />
      </h1>
      <img src="/src/assets/empty.svg" alt="no data found" width={400} />
    </div>
  );
}
