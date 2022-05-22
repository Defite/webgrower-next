export const convertDate = (date: Date | string, locale = "ru-RU") => {
  return new Date(date).toLocaleDateString(locale);
};
