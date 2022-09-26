import moment from "moment";

export const formatDateToBr = (text: string) => {
    return text
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2');
}

export const formatDateToUs = (text: string) => {
    return moment(text, 'DD/MM/YYYY').format('YYYY-MM-DD')
}