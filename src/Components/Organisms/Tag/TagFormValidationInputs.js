export const validateTagNombre = (nombre) => {
    const max = 50;
    const min = 2;
    const nombreToValidate = nombre.trim();
    const isBetween = (length, min, max) => !(length < min || length > max);

    if(!nombreToValidate){
        return "El nombre es requerido";
    }
    if(!isBetween(nombreToValidate.length, min, max)){
        return `El nombre debe contener entre ${min} y ${max} caracteres.`;
    }
    return null;
}