export const convertDate = (date: Date, locale = 'ru-RU') => {
    return new Date(date).toLocaleDateString(locale);
}