import Button from '#/components/Button';
import React, { useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { WebPageProvider } from './context/webPage.context';
import Form from './components/Form/Form';
import { toastNotifications } from '#/utilities/notificationsSwal';

const WebPageView: React.FC = () => {
  const MySwal = withReactContent(Swal);
  const modalRef = useRef(MySwal);

  const handleClick = (): void => {
    // TODO Crear contextWebPage
    // TODO Crear formulario para registro/edicion

    MySwal.fire({
      title: 'Registrar Páginas Web',
      html: (
        <BrowserRouter>
          <WebPageProvider>
            <Form
              modalRef={modalRef.current}
              onFormSubmit={() => {
                handleFormSubmit();
              }}
            />
          </WebPageProvider>
        </BrowserRouter>
      ),
      showConfirmButton: false,
      allowOutsideClick: true
    });
  };

  const handleFormSubmit = async (): Promise<void> => {
    modalRef.current?.close();
    toastNotifications().toastSucces();
    // TODO Recargar datos de paginación
  };

  return (
    <>
      <Button btnType="main" text="Registrar" type="button" onClick={handleClick} />
    </>
  );
};

export default WebPageView;
