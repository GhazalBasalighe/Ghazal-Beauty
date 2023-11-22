import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { Button } from "../../base";

export function UserInfoForm() {
  return (
    <div className="grid h-[88vh] place-items-center">
      <form className="w-3/4 grid grid-cols-2 gap-10">
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
        {/* NEXT TO TEXT AREA */}
        <div className="flex flex-col justify-between">
          {/* PHONE NUMBER SECTION */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="customerPhoneNumId"
              className="text-lg font-bold"
            >
              تلفن همراه:{" "}
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
          {/* DELIVERY DATE SECTION */}
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="hijriDatePicker" className="text-lg font-bold">
              تاریخ تحویل:
            </label>
            <DatePicker
              id="hijriDatePicker"
              inputClass="user-info-input w-full"
              calendar={persian}
              locale={persian_fa}
              className="user-info-input"
            />
          </div>
        </div>
        <div className="col-span-2 flex justify-end mt-5">
          <Button classes=" w-1/4">پرداخت</Button>
        </div>
      </form>
    </div>
  );
}
