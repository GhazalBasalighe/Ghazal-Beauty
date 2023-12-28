import { Button } from "../../base";

export function UserInfoForm() {
  return (
    <div className="grid h-[88vh] place-items-center">
      <form className="w-3/4 grid grid-cols-2 gap-10">
        {/* USERNAME SECTION */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="customerUsernameId"
            className="text-lg font-bold"
          >
            نام کاربری :
            <span className="text-gray-500 text-xs">(به لاتین) </span>
          </label>
          <input
            type="text"
            name="customerUsername"
            id="customerUsernameId"
            className="user-info-input"
          />
        </div>
        {/* PASSWORD SECTION */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="customerPasswordId"
            className="text-lg font-bold"
          >
            رمز عبور:
          </label>
          <input
            type="password"
            name="customerPassword"
            id="customerPasswordId"
            className="user-info-input"
          />
        </div>
        {/* NAME SECTION */}
        <div className="flex flex-col gap-2">
          <label htmlFor="customerNameId" className="text-lg font-bold">
            نام:
          </label>
          <input
            type="text"
            name="customerName"
            id="customerNameId"
            className="user-info-input"
          />
        </div>
        {/* LAST NAME SECTION */}
        <div className="flex flex-col gap-2">
          <label htmlFor="customerLNameId" className="text-lg font-bold">
            نام خانوادگی:
          </label>
          <input
            type="text"
            name="customerLName"
            id="customerLNameId"
            className="user-info-input"
          />
        </div>
        {/* PHONE NUMBER SECTION */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="customerPhoneNumId"
            className="text-lg font-bold"
          >
            تلفن همراه:
            <span className="text-gray-500 text-xs">
              (جهت هماهنگی ارسال سفارش)
            </span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            name="customerPhoneNum"
            id="customerPhoneNumId"
            className="user-info-input"
          />
        </div>
        {/* ADDRESS SECTION */}
        <div className="flex flex-col gap-2">
          <label htmlFor="customerAddressId" className="text-lg font-bold">
            آدرس تحویل:
          </label>
          <textarea
            name="customerAddress"
            id="customerAddressId"
            cols="10"
            rows="10"
            placeholder="به عنوان مثال : شهرك غرب - بلوار خوردين - خيابان توحيد ٣ - پلاك ١ - طبقه ٤"
            className=" resize-none user-info-input"
          />
        </div>
        <div className="col-span-2 flex justify-end mt-5">
          <Button classes=" w-1/4">پرداخت</Button>
        </div>
      </form>
    </div>
  );
}
