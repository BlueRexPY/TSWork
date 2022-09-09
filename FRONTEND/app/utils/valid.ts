import { EMAIL_REGEXP } from "./consts";

export const isEmailValid=(email:string) => EMAIL_REGEXP.test(email)
export const isPasswordVaild=(password:string) => password.length > 8 && password.length < 32