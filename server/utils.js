

/**
* Utility method to check if a string is empty or null
* @param {*} myString 
*/
function isStringNullOrEmpty(string) {
  return (string == null || !string || string.trim()==='') ? true : false;  
}

/**
 * Utility method to check if a email is valid
 * @param {*} string 
 * @returns 
 */
function isEmailValid(string){
  const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return EMAIL_REGEX.test(string);
}

/**
 * Utility method to check if a password is valid
 * @param {*} string 
 * @returns 
 */
function isPasswordValid(string){
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;
  return PWD_REGEX.test(string);
}

/**
 * Utility method to check if a name is valid
 * @param {*} string 
 * @returns 
 */
function isNameValid(string){
  const NAME_REGEX = /^[A-z]{3,23}$/;
  return NAME_REGEX.test(string);
}
module.exports = {isStringNullOrEmpty, isEmailValid, isPasswordValid, isNameValid};