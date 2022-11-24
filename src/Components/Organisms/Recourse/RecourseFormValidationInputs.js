import globalConstantes from "../../../const/globalConstantes.js";

export const validateNombre =(values) =>{
    const min = 5;
    const max = 150;
    const nombreToValidate = values.nombre.trim();
    const isBetween = (length, min, max) => !(length < min || length > max);

    if(!nombreToValidate)
        return "El nombre es requerido.";

    if(isBetween(nombreToValidate.length, min, max))
        return `El nombre debe contener entre ${min} a ${max} caracteres.`

    return null;
}

export const validateRuta = (values)=>{
    const min = 5;
    const max = 255;
    const rutaToValidate = values.ruta.trim();
    const isBetween = (length, min, max) => !(length < min || length > max);

    if(!rutaToValidate)
        return "La ruta es requerida.";

    if(isBetween(rutaToValidate.length, min, max))
        return `La ruta debe contener entre ${min} a ${max} caracteres.`

    return null;
}

export const validateAutor = (values)=>{
    const min = 5;
    const max = 75;
    const autorToValidate = values.autor.trim();
    const isBetween = (length, min, max) => !(length < min || length > max);

    if(!autorToValidate && isBetween(autorToValidate.length, min, max))
        return `La ruta debe contener entre ${min} a ${max} caracteres.`

    return null;
}

export const validateEditorial = (values)=>{
    const min = 5;
    const max = 75;
    const editorialToValidate = values.editorial.trim();
    const isBetween = (length, min, max) => !(length < min || length > max);

    if(!editorialToValidate && isBetween(editorialToValidate.length, min, max))
        return `La editorial debe contener entre ${min} a ${max} caracteres.`

    return null;
}

export const validateTipoId = (values) => {
    const validateTipoId = parseInt(values.tipoId);
    const isValidTipoId =values.recourseType.some(type => type.id === validateTipoId);
    if(!isValidTipoId)
        return "Debe seleccionar el Tipo de Recurso válido."

    return null;
}

export const validateTotalPaginas = (values) => {
    const validateTotalPaginas = values.totalPaginas;
    const isTipoLibro = values.recourseType.some(type => type.key === globalConstantes.RECOURSE_TYPE_LIBRO);

    if(isTipoLibro){
        if(!Number.isInteger(validateTotalPaginas))
            return "El número de Páginas debe ser un número entero";

        if(parseInt(validateTotalPaginas)<=0)
            return "El número de Páginas debe ser mayor a 0";
    }

    return null;
}

export const validateTotalCapitulos = (values) => {
    const validateTotalCapitulos = values.totalCapitulos;
    const isTipoLibro = values.recourseType.some(type => type.key === globalConstantes.RECOURSE_TYPE_LIBRO);

    if(isTipoLibro){
        if(!Number.isInteger(validateTotalCapitulos))
            return "El número de Capítulos debe ser un número entero";

        if(parseInt(validateTotalCapitulos)<=0)
            return "El número de Capítulos debe ser mayor a 0";
    }

    return null;
}

export const validateTotalVideos = (values) => {
    const validateTotalVideos = values.totalVideos;
    const isTipoVideo = values.recourseType.some(type => type.key === globalConstantes.RECOURSE_TYPE_VIDEO);

    if(isTipoVideo){
        if(!Number.isInteger(validateTotalVideos))
            return "El número de Videos debe ser un número entero";

        if(parseInt(validateTotalVideos)<=0)
            return "El número de Videos debe ser mayor a 0";
    }

    return null;
}

export const validateTotalHoras = (values) => {
    const validateTotalHoras = values.totalHoras;
    const isTipoVideo = values.recourseType.some(type => type.key === globalConstantes.RECOURSE_TYPE_VIDEO);
    const regex = /(\d+):([0-5][0-9]):([0-5][0-9])/;

    if(isTipoVideo){
        if(!regex.test(validateTotalHoras))
            return "Debe ingresar las horas en el formato correcto hh:mm:ss ";
    }

    return null;
}

