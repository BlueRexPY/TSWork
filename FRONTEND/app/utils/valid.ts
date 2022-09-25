import { EMAIL_REGEXP, GITHUB_REGEXP } from "./consts";

export const isEmailValid = (email: string) => EMAIL_REGEXP.test(email)
export const isPasswordVaild = (password: string) => password.length >= 8 && password.length <= 32
const isGithub = (github: string) => GITHUB_REGEXP.test(github)

export const registerValid = (
    name: string, 
    surename:string,
    email: string, 
    password:string,
    github:string,
) => {
    if(
        name.length > 3 &&
        surename.length > 3 &&
        isEmailValid(email) &&
        isPasswordVaild(password) &&
        isGithub(github)
    ){
        return true
    }
    return false
}