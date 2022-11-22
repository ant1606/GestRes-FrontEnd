import Swal from "sweetalert2";

export const toastNotifications = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showCloseButton: true,
        showConfirmButton: false,
        timer: 300000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const toastError = () => {
        Toast.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Ocurrio un error en el formulario',
            customClass: {
                title: 'text-red-700',
                popup: 'p-2'
            }
        })

        // Swal.fire({
        //     position: 'top-end',
        //     icon: 'error',
        //     title: `ERROR`,
        //     text: `Ocurrio un error en el formulario.`,
        //     color: 'red',
        //     background: 'red',
        //     showConfirmButton: false,
        //     timer: 30000,
        //     toast: true
        // });
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

    const notificationError = (msg) => {
        console.log("mostrando notification");
        Swal.fire({
            icon: 'error',
            title: 'Sistema',
            text: msg
        })
    }

    return {toastSucces, toastError, notificationError};
}
