import Register from '@/pages/Register';
import { setServiceRegisterResponseSuccess } from '@/tests/mocks/register.handlers';
import { renderWithProviders } from '@/tests/utils/renderWithProvider';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe('Test en Register', () => {
  /***
   * Casos de Test
   * [X] Debe mostrar mensajes de validación cuando se hace submit y no envia xxx dato
   * [X] Debe mostrar un mensaje de notificación si se recibe un mensaje de error del API
   * [X] Debe mostrar notificación de envio de email de verificación luego de registro de usuario satisfactorio
   */

  beforeEach(() => {
    cleanup();
    setServiceRegisterResponseSuccess(true);
  });
  afterAll(() => {
    cleanup();
    setServiceRegisterResponseSuccess(true);
  });
  test('Register  debe renderizarse', () => {
    const wrapper = renderWithProviders(<Register />);
    wrapper.unmount();
  });

  test('Debe mostrar notificación de envio de email de verificación luego de registro de usuario satisfactorio', async () => {
    const wrapper = renderWithProviders(<Register />);
    setServiceRegisterResponseSuccess(true);
    act(() => {
      fireEvent.change(wrapper.getByTestId('email'), {
        target: { value: 'testUser@email.com' }
      });
      fireEvent.change(wrapper.getByTestId('name'), { target: { value: 'test User' } });
      fireEvent.change(wrapper.getByTestId('password'), { target: { value: '123456' } });
      fireEvent.change(wrapper.getByTestId('passwordConfirmation'), {
        target: { value: '123456' }
      });
      fireEvent.click(wrapper.getByRole('button'));
    });

    await waitFor(() => {
      expect(wrapper.getByText(/enviado un link/)).toBeInTheDocument();
    });
    wrapper.unmount();
  });

  test('Debe mostrar notificación de error al recibir una respuesta de error por el API', async () => {
    const wrapper = renderWithProviders(<Register />);
    setServiceRegisterResponseSuccess(false);
    act(() => {
      fireEvent.change(wrapper.getByTestId('email'), {
        target: { value: 'testUser@email.com' }
      });
      fireEvent.change(wrapper.getByTestId('name'), { target: { value: 'test User' } });
      fireEvent.change(wrapper.getByTestId('password'), { target: { value: '123456' } });
      fireEvent.change(wrapper.getByTestId('passwordConfirmation'), {
        target: { value: '123456' }
      });
      fireEvent.click(wrapper.getByRole('button'));
    });

    await waitFor(() => {
      expect(
        wrapper.getByText(/Hubo problemas en la comunicación con el servidor/)
      ).toBeInTheDocument();
      expect(wrapper).toMatchSnapshot();
      wrapper.unmount();
    });
  });

  describe('Test de validación del formulario', () => {
    beforeEach(() => {
      cleanup();
    });

    test('Debe mostrar mensajes de validación cuando se envia el formulario sin ingresar datos', async () => {
      const wrapper = renderWithProviders(<Register />);
      const user = userEvent.setup();
      await user.click(wrapper.getByText('Registrar'));
      await waitFor(() => {
        expect(wrapper.getByText(/ingresar el nombre del usuario/)).toBeInTheDocument();
        expect(wrapper.getByText(/ingresar el email del usuario/)).toBeInTheDocument();
        expect(wrapper.getByText(/ingresar el password del usuario/)).toBeInTheDocument();
        expect(
          wrapper.getByText(/ingresar la confirmación de password del usuario/)
        ).toBeInTheDocument();
      });
      wrapper.unmount();
    });

    test('Debe mostrar mensaje de validación cuando no se ingresa nombre', async () => {
      const wrapper = renderWithProviders(<Register />);
      act(() => {
        fireEvent.change(wrapper.getByTestId('email'), {
          target: { value: 'miemail@validemail.com' }
        });
        fireEvent.change(wrapper.getByTestId('password'), { target: { value: '123456' } });
        fireEvent.change(wrapper.getByTestId('passwordConfirmation'), {
          target: { value: '123456' }
        });
        fireEvent.click(wrapper.getByText('Registrar'));
      });

      await waitFor(() => {
        expect(wrapper.getByText(/ingresar el nombre del usuario/)).toBeInTheDocument();
      });
      wrapper.unmount();
    });

    test('Debe mostrar mensaje de validación cuando no se ingresa el email', async () => {
      const wrapper = renderWithProviders(<Register />);
      act(() => {
        fireEvent.change(wrapper.getByTestId('name'), {
          target: { value: 'mi nombre' }
        });
        fireEvent.change(wrapper.getByTestId('password'), { target: { value: '123456' } });
        fireEvent.change(wrapper.getByTestId('passwordConfirmation'), {
          target: { value: '123456' }
        });
        fireEvent.click(wrapper.getByText('Registrar'));
      });

      await waitFor(() => {
        expect(wrapper.getByText(/ingresar el email del usuario/)).toBeInTheDocument();
      });
      wrapper.unmount();
    });

    test('Debe mostrar mensaje de validación cuando se ingresa formato incorrecto del email', async () => {
      const wrapper = renderWithProviders(<Register />);
      act(() => {
        fireEvent.change(wrapper.getByTestId('name'), { target: { value: 'mi nombre' } });
        fireEvent.change(wrapper.getByTestId('email'), { target: { value: 'miemail.sinformato' } });
        fireEvent.change(wrapper.getByTestId('password'), { target: { value: '123456' } });
        fireEvent.change(wrapper.getByTestId('passwordConfirmation'), {
          target: { value: '123456' }
        });
        fireEvent.click(wrapper.getByText('Registrar'));
      });

      await waitFor(() => {
        expect(wrapper.getByText(/Formato incorrecto ingresado del email/)).toBeInTheDocument();
      });
      wrapper.unmount();
    });

    test('Debe mostrar mensaje de validación cuando no se ingresa el password', async () => {
      const wrapper = renderWithProviders(<Register />);
      act(() => {
        fireEvent.change(wrapper.getByTestId('name'), { target: { value: 'mi nombre' } });
        fireEvent.change(wrapper.getByTestId('email'), { target: { value: 'mi@email.com' } });
        fireEvent.change(wrapper.getByTestId('passwordConfirmation'), {
          target: { value: '123456' }
        });
        fireEvent.click(wrapper.getByText('Registrar'));
      });

      await waitFor(() => {
        expect(wrapper.getByText(/ingresar el password del usuario/)).toBeInTheDocument();
      });
      wrapper.unmount();
    });

    test('Debe mostrar mensaje de validación cuando no se ingresa el password confirmation', async () => {
      const wrapper = renderWithProviders(<Register />);
      act(() => {
        fireEvent.change(wrapper.getByTestId('name'), { target: { value: 'mi nombre' } });
        fireEvent.change(wrapper.getByTestId('email'), { target: { value: 'mi@email.com' } });
        fireEvent.change(wrapper.getByTestId('password'), { target: { value: '123456' } });
        fireEvent.click(wrapper.getByText('Registrar'));
      });

      await waitFor(() => {
        expect(
          wrapper.getByText(/ingresar la confirmación de password del usuario/)
        ).toBeInTheDocument();
      });
      wrapper.unmount();
    });

    test('Debe mostrar mensaje de validación cuando el password Confirmation no es igual al password', async () => {
      const wrapper = renderWithProviders(<Register />);
      act(() => {
        fireEvent.change(wrapper.getByTestId('name'), { target: { value: 'mi nombre' } });
        fireEvent.change(wrapper.getByTestId('email'), { target: { value: 'mi@email.com' } });
        fireEvent.change(wrapper.getByTestId('password'), { target: { value: '123456' } });
        fireEvent.change(wrapper.getByTestId('passwordConfirmation'), {
          target: { value: '12345678910' }
        });
        fireEvent.click(wrapper.getByText('Registrar'));
      });

      await waitFor(() => {
        expect(wrapper.getByText(/Las contraseñas ingresadas no son iguales/)).toBeInTheDocument();
      });
      wrapper.unmount();
    });
  });
});
