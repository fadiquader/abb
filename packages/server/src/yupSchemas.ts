import * as yup from "yup";

export const registerPasswordValidation = yup
  .string()
  .min(3, 'Password Is Not Long Enough')
  .max(255);
