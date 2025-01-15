// validacion contra
export const isGoodPassword=    value =>{
    //entre 6 y 12 caracteres, minimo un digito numerico, 
    //minimo una letra mayuscula, minimo una letra minuscula
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/; //helpers se llama esto 
    return regex.test(value)
}