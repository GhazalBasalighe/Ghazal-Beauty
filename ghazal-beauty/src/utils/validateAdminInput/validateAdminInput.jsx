import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, "نام کاربری باید حداقل 3 حرف باشد")
    .max(20, "نام کاربری نمی‌تواند بیش از 20 حرف باشد")
    .required("نام کاربری نمی‌تواند خالی باشد"),
  password: Yup.string()
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
    .max(60, "رمز عبور نمی‌تواند بیش از 60 کاراکتر باشد")
    .required("رمز عبور نمی‌تواند خالی باشد"),
});
