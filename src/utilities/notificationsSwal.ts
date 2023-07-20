// TODO Refactorizar todo esto
import Swal from 'sweetalert2';

export const toastNotifications = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showCloseButton: true,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  const toastError = () => {
    Toast.fire({
      icon: 'error',
      title: 'ERROR',
      text: 'Ocurrio un error en el formulario',
      customClass: {
        title: 'text-red-700',
        popup: 'p-2'
      }
    });

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
  };

  const toastSucces = () => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se registro satisfactoriamente',
      showConfirmButton: false,
      timer: 3000,
      toast: true
    });
  };

  const toastSuccesCustomize = (message) => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      toast: true
    });
  };

  const notificationError = (msg) => {
    Swal.fire({
      icon: 'error',
      title: 'Sistema',
      text: msg
    });
  };

  const modalDeleteConfirm = async (name: string): Promise<boolean> => {
    let confirm = false;

    await Swal.fire({
      title: `¿Desea eliminar el registro ${name}?`,
      text: 'Esta acción no podrá ser revertida',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ACEPTAR',
      cancelButtonText: 'CANCELAR',
      reverseButtons: true,
      customClass: {
        confirmButton:
          'bg-green-600 rounded-xl text-white py-2 px-5 text-xl font-medium hover:bg-green-700',
        cancelButton:
          'bg-red-600 rounded-xl text-white py-2 px-5 text-xl font-medium hover:bg-red-900',
        actions: 'gap-10'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        confirm = true;
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        confirm = false;
      }
    });

    return confirm;
  };

  return {
    toastSucces,
    toastError,
    notificationError,
    modalDeleteConfirm,
    toastSuccesCustomize
  };
};
