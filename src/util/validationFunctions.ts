export const phoneRegex = (phone: string) =>
  /^[+]{0,1}[\d \s\(\)-]*$/.test(phone);
