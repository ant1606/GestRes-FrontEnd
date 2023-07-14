import { PasswordReset } from '@/pages/PasswordReset';
import { renderWithProviders } from '@/tests/utils/renderWithProvider';
import { cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';

describe('Test en PasswordReset', () => {
  beforeEach(() => {
    cleanup();
  });

  test.todo('', () => { });

  test.todo('Debe mostrar ventana de dialogo mostrando el error recibido por parte de la API');
  test.todo(
    'Debe mostrar ventana de dialogo si no se llego a ingresar el token para el reseteo de password'
  );
  test.todo(
    'Debe mostrar notificación indicando que se cambio la contraseña y redirigir al login',
    () => { }
  );

  describe('Test de validación del formulario', () => {
    beforeEach(() => {
      cleanup();
    });

    test('Debe mostrar validación al enviar el formulario sin ingresar el email', async () => {
      const wrapper = renderWithProviders(
        <Routes>
          <Route path="reset-password" element={<PasswordReset />} />
        </Routes>,
        undefined,
        [`/reset-password?token=miToken`]
      );
      const user = userEvent.setup();
      await user.type(wrapper.getByTestId('password'), 'micontraseña');
      await user.type(wrapper.getByTestId('passwordConfirmation'), 'micontraseña');
      await user.click(wrapper.getByText('Cambiar Contraseña'));

      await waitFor(() => {
        expect(wrapper.getByText('Debe ingresar el email del usuario'));
        wrapper.unmount();
      });
    });

    test('Debe mostrar validación al ingresar email no valido', async () => {
      const wrapper = renderWithProviders(
        <Routes>
          <Route path="reset-password" element={<PasswordReset />} />
        </Routes>,
        undefined,
        [`/reset-password?token=miToken`]
      );
      const user = userEvent.setup();
      await user.type(wrapper.getByTestId('email'), 'miEamil@novalido');
      await user.type(wrapper.getByTestId('password'), 'micontraseña');
      await user.type(wrapper.getByTestId('passwordConfirmation'), 'micontraseña');
      await user.click(wrapper.getByText('Cambiar Contraseña'));

      await waitFor(() => {
        expect(wrapper.getByText('Formato incorrecto ingresado del email'));
        wrapper.unmount();
      });
    });

    test('Debe mostrar validación al enviar el formulario sin ingresar el password', async () => {
      const wrapper = renderWithProviders(
        <Routes>
          <Route path="reset-password" element={<PasswordReset />} />
        </Routes>,
        undefined,
        [`/reset-password?token=miToken`]
      );
      const user = userEvent.setup();
      await user.type(wrapper.getByTestId('email'), 'miemail@valido.com');
      await user.type(wrapper.getByTestId('passwordConfirmation'), 'micontraseña');
      await user.click(wrapper.getByText('Cambiar Contraseña'));

      await waitFor(() => {
        expect(wrapper.getByText('Debe ingresar el password del usuario'));
        wrapper.unmount();
      });
    });

    test('Debe mostrar validación al enviar el formulario sin ingresar la confirmación del password', async () => {
      const wrapper = renderWithProviders(
        <Routes>
          <Route path="reset-password" element={<PasswordReset />} />
        </Routes>,
        undefined,
        [`/reset-password?token=miToken`]
      );
      const user = userEvent.setup();
      await user.type(wrapper.getByTestId('email'), 'miemail@valido.com');
      await user.type(wrapper.getByTestId('password'), 'micontraseña');
      await user.click(wrapper.getByText('Cambiar Contraseña'));

      await waitFor(() => {
        expect(wrapper.getByText('Debe ingresar la confirmación de password del usuario'));
        wrapper.unmount();
      });
    });

    test('Debe mostrar validación si la confirmación de password es distinto al password', async () => {
      const wrapper = renderWithProviders(
        <Routes>
          <Route path="reset-password" element={<PasswordReset />} />
        </Routes>,
        undefined,
        [`/reset-password?token=miToken`]
      );
      const user = userEvent.setup();
      await user.type(wrapper.getByTestId('email'), 'miemail@valido.com');
      await user.type(wrapper.getByTestId('password'), 'micontraseña');
      await user.type(wrapper.getByTestId('passwordConfirmation'), 'noSonIguales');
      await user.click(wrapper.getByText('Cambiar Contraseña'));

      await waitFor(() => {
        expect(wrapper.getByText('Las contraseñas ingresadas no son iguales'));
        wrapper.unmount();
      });
    });
  });
});
