/**
 * function get stored values from sessionStorage for create order form
 * @returns an object of values
 */

const getValues = () => {
    const values = sessionStorage.getItem('values');    
    const objectValues = JSON.parse(values);
      if(objectValues){
          objectValues.bookingTime = new Date(objectValues.bookingTime); 
      }    
    return objectValues;    
}

export default getValues;

