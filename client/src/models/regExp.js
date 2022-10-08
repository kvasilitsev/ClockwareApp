const USER_REGEX = /^[A-z]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export { USER_REGEX, PWD_REGEX, EMAIL_REGEX };
