import Swal from "sweetalert2";

export const toastNotifications = () => {
    const toastError = () => {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `Ocurrio un error en el formulario.`,
            showConfirmButton: false,
            timer: 3000,
            toast: true
        });
    }

    const toastSucces = () => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se registro satisfactoriamente',
            showConfirmButton: false,
            timer: 3000,
            toast: true
        });
    }

    return {toastSucces, toastError};
}
