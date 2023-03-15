/**
 * Function enables language-sensitive date and time formatting
 * @param {string} date date in string format
 * @returns 
 */


const timeformatConvert = (date) => {
  const newDate = new Date(date);         
  return  new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short', timeZone: 'UTC' }).format(newDate);
}

export default timeformatConvert;

