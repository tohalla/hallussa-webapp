export const isValidEmail = (email: string) =>
  /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,5})$/.test(email);

export const isValidPhone = (phone: string) =>
  /^[+]{0,1}[\d \s\(\)-]*$/.test(phone);
