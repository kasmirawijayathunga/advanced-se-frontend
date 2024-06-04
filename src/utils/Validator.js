import validator from "validator";

const REGEX_PASSWORD = RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\.!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[\.A-Za-z\d\.!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/);
const REGEX_DOMAIN = RegExp("^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$");

export function Validator_isMobile(data) {
    if(data === undefined || data === null || data === ""){
        return false;
    } else if(validator.isMobilePhone(data)){
        return true;
    } else {
        return false;
    }
}

export function Validator_isEmpty(data) {
    if(data === undefined || data === null || data === ""){
        return true;
    } else if(typeof data === 'number'){
        return false;
    } else if(validator.isEmpty(data)){
        return true;
    } else {
        return false;
    }
}

export function Validator_isEmail(data) {
    if(data === undefined || data === null || data === ""){
        return false;
    } else if(validator.isEmail(data)){
        return true;
    } else {
        return false;
    }
}

export function Validator_isFloat(n) {
    if(n === undefined || n === null || n === ""){
        return false;
    } else if(typeof data === 'number' && /[.]/.test(String(n))){
        return true;
    } else {
        return false;
    }
}

export function Validator_isBoolean(data) {
    if(data === undefined || data === null || data === ""){
        return false;
    } else if(typeof data === "boolean"){
        return true;
    } else {
        return false;
    }
}

export function Validator_isPostalCode(data) {
    if(data === undefined || data === null || data === ""){
        return false;
    } else if(validator.isPostalCode(data, 'any')){
        return true;
    } else {
        return false;
    }
}

export function Validator_isDate(data) {
    if(data === undefined || data === null || data === ""){
        return false;
    } else if(data?.getDate()){
        return true;
    } else if(validator.toDate(data) !== null){
        return true;
    } else {
        return false;
    }
}

export function Validator_goodPassword(data) {
    if(data === undefined || data === null || data === ""){
        return false;
    } else if(REGEX_PASSWORD.test(data)){
        return true;
    } else {
        return false;
    }
}

export function Validator_isDomain(data){
    if(data === undefined || data === null || data === ""){
        return false;
    } else if(REGEX_DOMAIN.test(data)){
        return true;
    } else {
        return false;
    }
}

export default validator;