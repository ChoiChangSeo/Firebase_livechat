export const checkEmail = (mail) => {
  const EmailRex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return EmailRex.test(mail);
};
export const checkPassword = (password) => {
  const PasswordRex =
    /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/;
  return PasswordRex.test(password);
};
