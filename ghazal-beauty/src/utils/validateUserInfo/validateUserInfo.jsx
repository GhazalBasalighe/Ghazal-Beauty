import * as yup from "yup";

const userInfoFormSchema = yup.object().shape({
  customerUsername: yup
    .string()
    .trim()
    .required("نام کاربری الزامی است")
    .min(3, "نام کاربری باید حداقل 3 کاراکتر باشد"),
  customerPassword: yup
    .string()
    .required("رمز عبور الزامی است")
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
  customerName: yup.string().trim().required("نام الزامی است"),
  customerLName: yup.string().trim().required("نام خانوادگی الزامی است"),
  customerPhoneNum: yup
    .string()
    .trim()
    .matches(/^[0-9]*$/, "تلفن همراه باید عدد باشد")
    .required("تلفن همراه الزامی است")
    .length(11, "تلفن همراه باید 11 رقم باشد"),
  customerAddress: yup.string().trim().required("آدرس الزامی است"),
});

export { userInfoFormSchema };
