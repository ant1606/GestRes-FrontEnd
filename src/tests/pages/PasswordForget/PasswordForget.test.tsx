import { Route, Routes } from 'react-router-dom';
import { renderWithProviders } from '#/tests/utils/renderWithProvider';
import PasswordForget from '#/pages/PasswordForget';
import userEvent from '@testing-library/user-event';
import { cleanup, waitFor } from '@testing-library/react';
import { setServiceForgetPasswordResponseSuccess } from '#/tests/mocks/forgetPassword.handlers';

describe('Test en PasswordForget', () => {
  beforeEach(() => {
    cleanup();
    setServiceForgetPasswordResponseSuccess(true);
  });

  test('Debe mostrar validación al enviar el formulario sin ingresar el correo', async () => {
    const wrapper = renderWithProviders(
      <Routes>
        <Route path="forget-password" element={<PasswordForget />} />
      </Routes>,
      undefined,
      ['/forget-password']
    );
    const user = userEvent.setup();
    await user.click(wrapper.getByText(/siguiente/i));
    await waitFor(() => {
      expect(wrapper.getByText('Debe ingresar el email del usuario')).toBeInTheDocument();
      wrapper.unmount();
    });
  });

  test('Debe mostrar validación al ingresar un correo no válido', async () => {
    const wrapper = renderWithProviders(
      <Routes>
        <Route path="forget-password" element={<PasswordForget />} />
      </Routes>,
      undefined,
      ['/forget-password']
    );
    const user = userEvent.setup();
    await user.type(wrapper.getByTestId('email'), 'emailNoValido');
    await user.click(wrapper.getByText(/siguiente/i));
    await waitFor(() => {
      expect(wrapper.getByText('Formato incorrecto ingresado del email')).toBeInTheDocument();
      wrapper.unmount();
    });
  });

  test('Debe mostrar ventana de dialogo al recibir un error por parte de la API', async () => {
    setServiceForgetPasswordResponseSuccess(false);
    const wrapper = renderWithProviders(
      <Routes>
        <Route path="forget-password" element={<PasswordForget />} />
      </Routes>,
      undefined,
      ['/forget-password']
    );
    const user = userEvent.setup();
    await user.type(wrapper.getByTestId('email'), 'micorreo@email.com');
    await user.click(wrapper.getByText(/siguiente/i));
    await waitFor(() => {
      expect(
        wrapper.getByText('Hubo problemas en la comunicación con el servidor')
      ).toBeInTheDocument();
      wrapper.unmount();
    });
  });

  test('Debe mostrar mensaje en pagina que se envio link de reseteo de password', async () => {
    setServiceForgetPasswordResponseSuccess(true);
    const wrapper = renderWithProviders(
      <Routes>
        <Route path="forget-password" element={<PasswordForget />} />
      </Routes>,
      undefined,
      ['/forget-password']
    );
    const user = userEvent.setup();
    await user.type(wrapper.getByTestId('email'), 'micorreo@email.com');
    await user.click(wrapper.getByText(/siguiente/i));
    await waitFor(() => {
      expect(wrapper.getByText(/Hemos enviado un link a tu email/i)).toBeInTheDocument();
      wrapper.unmount();
    });
  });
});
