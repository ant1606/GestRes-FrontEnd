import globalConstantes from "../../../const/globalConstantes.js";

export const validateNombre =(values) =>{
    const min = 5;
    const max = 150;
    const nombreToValidate = values.nombre.trim();
    const isBetween = (length, min, max) => (length >= min && length <= max);

    if(!nombreToValidate)
        return "El nombre es requerido.";

    if(!isBetween(nombreToValidate.length, min, max))
        return `El nombre debe contener entre ${min} a ${max} caracteres.`

    return null;
}

export const validateRuta = (values)=>{
    const min = 5;
    const max = 255;
    const rutaToValidate = values.ruta.trim();
    const isBetween = (length, min, max) => (length >= min && length <= max);

    if(!rutaToValidate)
        return "La ruta es requerida.";

    if(!isBetween(rutaToValidate.length, min, max))
        return `La ruta debe contener entre ${min} a ${max} caracteres.`

    return null;
}

export const validateAutor = (values)=>{
    const min = 5;
    const max = 75;
    const autorToValidate = values.autor.trim();
    const isBetween = (length, min, max) => (length >= min && length <= max);

    if(autorToValidate && !isBetween(autorToValidate.length, min, max))
        return `La ruta debe contener entre ${min} a ${max} caracteres.`

    return null;
}

export const validateEditorial = (values)=>{
    const min = 5;
    const max = 75;
    const editorialToValidate = values.editorial.trim();
    const isBetween = (length, min, max) => (length >= min && length <= max);

    if(editorialToValidate && !isBetween(editorialToValidate.length, min, max))
        return `La editorial debe contener entre ${min} a ${max} caracteres.`

    return null;
}

export const validateTipoId = (values) => {
    const validateTipoId = parseInt(values.tipoId);
    const isValidTipoId = values.recourseType.some(type => type.id === validateTipoId);

    if(!isValidTipoId)
        return "Debe seleccionar el Tipo de Recurso válido."

    return null;
}

export const validateTotalPaginas = (values) => {
    const validateTotalPaginas = values.totalPaginas.trim();
    const typeLibro = values.recourseType.find(value => value.key === globalConstantes.RECOURSE_TYPE_LIBRO);
    const isTipoLibro = parseInt(values.tipoId) === typeLibro.id;

    if(isTipoLibro){
        if(validateTotalPaginas.length===0)
            return "Total Páginas es requerido";

        if(!Number.isInteger(parseInt(validateTotalPaginas)))
            return "Total Páginas debe ser un número entero";

        if(parseInt(validateTotalPaginas)<=0)
            return "Total Páginas debe ser mayor a 0";
    }

    return null;
}

export const validateTotalCapitulos = (values) => {
    const validateTotalCapitulos = values.totalCapitulos.trim();
    const typeLibro = values.recourseType.find(value => value.key === globalConstantes.RECOURSE_TYPE_LIBRO);
    const isTipoLibro = parseInt(values.tipoId) === typeLibro.id;

    if(isTipoLibro){
        if(validateTotalCapitulos.length===0)
            return "Total Capitulos es requerido";

        if(!Number.isInteger(parseInt(validateTotalCapitulos)))
            return "Total Capítulos debe ser un número entero";

        if(parseInt(validateTotalCapitulos)<=0)
            return "Total Capítulos debe ser mayor a 0";
    }

    return null;
}

export const validateTotalVideos = (values) => {
    const validateTotalVideos = values.totalVideos.trim();
    const typeVideo = values.recourseType.find(value => value.key === globalConstantes.RECOURSE_TYPE_VIDEO);
    const isTipoVideo = parseInt(values.tipoId) === typeVideo.id;

    if(isTipoVideo){
        if(validateTotalVideos.length===0)
            return "Total Videos es requerido";

        if(!Number.isInteger(parseInt(validateTotalVideos)))
            return "Total Videos debe ser un número entero";

        if(parseInt(validateTotalVideos)<=0)
            return "Total Videos debe ser mayor a 0";
    }

    return null;
}

export const validateTotalHoras = (values) => {
    const validateTotalHoras = values.totalHoras.trim();
    const typeVideo = values.recourseType.find(value => value.key === globalConstantes.RECOURSE_TYPE_VIDEO);
    const isTipoVideo = parseInt(values.tipoId) === typeVideo.id;
    const regex = /(\d+):([0-5][0-9]):([0-5][0-9])/;

    if(isTipoVideo){
        if(validateTotalHoras.length===0)
            return "Total Videos es requerido";

        // if(validateTotalHoras === "00:00:00")
        //     return "Total Horas debe tener un valor distinto a 0";

        if(!regex.test(validateTotalHoras))
            return "Total Horas debe ser en formato hh:mm:ss ";
    }

    return null;
}

