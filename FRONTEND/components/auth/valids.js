export const loginValidValue = (value) =>
  value.length > 2 && value.length < 17 && value.trim() !== "";
export const passwordValidValue = (value) =>
  value.length > 7 && value.length < 33 && value.trim() !== "";

export const registerValid = (login, password, repeatPassword) =>
  passwordValidValue(password) &&
  passwordValidValue(repeatPassword) &&
  password === repeatPassword &&
  loginValidValue(login);

export const loginValid = (login, password) =>
  passwordValidValue(password) && loginValidValue(login);
