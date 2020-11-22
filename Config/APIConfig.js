/**JS CON TODO LO NECESARIO PARA PODER ACCEDER A LA API DE MARVEL*/

//API KEYS
const PRIV_KEY = "4d91fee2de3e15d63d05abe01cece13bb8240cbb";
const PUBLIC_KEY = "07dcb43a1cd22c75ac979f6c99206da7";

/**
 * Calcula el tiempo
 * @returns {number}
 */
function calculateTs(){
    return new Date().getTime();
}

/**
 * Calcula Hash
 * @returns {*}
 */
function calculateHash(){
    return CryptoJS.MD5(calculateTs() + PRIV_KEY + PUBLIC_KEY).toString();
}
