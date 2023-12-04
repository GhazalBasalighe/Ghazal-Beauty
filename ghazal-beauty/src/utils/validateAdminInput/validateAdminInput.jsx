import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  userName: Yup.string().required("نام کاربری نمی‌تواند خالی باشد"),
  password: Yup.string().required("رمز عبور نمی‌تواند خالی باشد"),
});
