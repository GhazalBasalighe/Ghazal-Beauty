import { useState } from "react";
import { Button } from "../../base";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { userInfoFormSchema } from "../../../utils";
import api from "../../../config/axiosInstance";
import { loginUser } from "../../../store/thunk/thunk";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export function UserInfoForm() {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  function handlePasswordVisibility() {
    setIsPasswordHidden((isPasswordHidden) => !isPasswordHidden);
  }
  // RENDER APPROPRIATE SVG ACCORDING TO PASSWORD VISIBILITY
  const visibleIcon = (
    <div className="absolute left-2 bottom-[9px] cursor-pointer">
      {isPasswordHidden ? (
        <Eye size={24} onClick={handlePasswordVisibility} />
      ) : (
        <EyeSlash size={24} onClick={handlePasswordVisibility} />
      )}
    </div>
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleAddUser(formData) {
    try {
      await api.post("/users", formData);
      await dispatch(
        loginUser({
          username: formData.username,
          password: formData.password,
        })
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="grid h-[88vh] place-items-center">
      <Formik
        initialValues={{
          customerUsername: "",
          customerPassword: "",
          customerName: "",
          customerLName: "",
          customerPhoneNum: "",
          customerAddress: "",
        }}
        validationSchema={userInfoFormSchema}
        onSubmit={async (values) => {
          const formData = {
            firstname: values.customerName,
            lastname: values.customerLName,
            username: values.customerUsername,
            password: values.customerPassword,
            phoneNumber: values.customerPhoneNum,
            address: values.customerAddress,
            role: "USER",
          };
          await handleAddUser(formData);
        }}
      >
        <Form className="w-3/4 grid grid-cols-2 gap-10">
          {/* USERNAME SECTION */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="customerUsernameId"
              className="text-lg font-bold"
            >
              نام کاربری :
              <span className="text-gray-500 text-xs">(به لاتین) </span>
            </label>
            <Field
              type="text"
              name="customerUsername"
              id="customerUsernameId"
              className="user-info-input"
            />
            <ErrorMessage
              name="customerUsername"
              component="div"
              className="text-red-500"
            />
          </div>
          {/* PASSWORD SECTION */}
          <div className="flex flex-col gap-2 relative">
            <label
              htmlFor="customerPasswordId"
              className="text-lg font-bold"
            >
              رمز عبور:
            </label>
            <div className="relative w-full">
              <Field
                type={isPasswordHidden ? "password" : "text"}
                name="customerPassword"
                id="customerPasswordId"
                className="user-info-input"
              />
              {visibleIcon}
            </div>
            <ErrorMessage
              name="customerPassword"
              component="div"
              className="text-red-500"
            />
          </div>
          {/* NAME SECTION */}
          <div className="flex flex-col gap-2">
            <label htmlFor="customerNameId" className="text-lg font-bold">
              نام:
            </label>
            <Field
              type="text"
              name="customerName"
              id="customerNameId"
              className="user-info-input"
            />
            <ErrorMessage
              name="customerName"
              component="div"
              className="text-red-500"
            />
          </div>
          {/* LAST NAME SECTION */}
          <div className="flex flex-col gap-2">
            <label htmlFor="customerLNameId" className="text-lg font-bold">
              نام خانوادگی:
            </label>
            <Field
              type="text"
              name="customerLName"
              id="customerLNameId"
              className="user-info-input"
            />
            <ErrorMessage
              name="customerLName"
              component="div"
              className="text-red-500"
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
            <Field
              type="text"
              inputMode="numeric"
              name="customerPhoneNum"
              id="customerPhoneNumId"
              className="user-info-input"
            />
            <ErrorMessage
              name="customerPhoneNum"
              component="div"
              className="text-red-500"
            />
          </div>
          {/* ADDRESS SECTION */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="customerAddressId"
              className="text-lg font-bold"
            >
              آدرس تحویل:
            </label>
            <Field
              as="textarea"
              name="customerAddress"
              id="customerAddressId"
              cols="10"
              rows="10"
              placeholder="به عنوان مثال : شهرك غرب - بلوار خوردين - خيابان توحيد ٣ - پلاك ١ - طبقه ٤"
              className="resize-none user-info-input"
            />
            <ErrorMessage
              name="customerAddress"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="col-span-2 flex justify-end mt-5">
            <Button type="submit" classes="w-1/4">
              ثبت نام
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
