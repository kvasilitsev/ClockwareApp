export default function dateToUTC (setDate) {
    const dateToMS = new Date(setDate);
    const year = dateToMS.getFullYear();
    const month = dateToMS.getMonth();
    const date = dateToMS.getDate();
    const hours = dateToMS.getHours();
    const utcDate = new Date(Date.UTC(year, month, date, hours));    
    return utcDate.toUTCString();
}

