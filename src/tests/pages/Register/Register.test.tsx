import { Register } from '@/pages/Register';
import { setServiceRegisterResponseSuccess } from '@/tests/mocks/register.handlers';
import { renderWithProviders } from '@/tests/utils/renderWithProvider';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('Test en Register', () => {
  /***
   * Casos de Test
   * [X] Debe mostrar mensajes de validación cuando se hace submit y no envia xxx dato
   * [X] Debe mostrar un mensaje de notificación si se recibe un mensaje de error del API
   * [X] Debe mostrar notificación de envio de email de verificación luego de registro de usuario satisfactorio
   */
  beforeEach(() => {
    cleanup();
  });
  test('Register  debe renderizarse', () => {
    renderWithProviders(<Register />);
  });

  test('Debe mostrar notificación de envio de email de verificación luego de registro de usuario satisfactorio', async () => {
    renderWithProviders(<Register />);
    setServiceRegisterResponseSuccess(true);
    act(() => {
      fireEvent.change(screen.getByTestId('email'), {
        target: { value: 'testUser@email.com' }
      });
      fireEvent.change(screen.getByTestId('name'), { target: { value: 'test User' } });
      fireEvent.change(screen.getByTestId('password'), { target: { value: '123456' } });
      fireEvent.change(screen.getByTestId('passwordConfirmation'), {
        target: { value: '123456' }
      });
      fireEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
      expect(screen.getByText(/enviado un link/)).toBeInTheDocument();
    });
  });

  test('Debe mostrar notificación de error al recibir una respuesta de error por el API', async () => {
    const renderResult = renderWithProviders(<Register />);
    setServiceRegisterResponseSuccess(false);
    act(() => {
      fireEvent.change(screen.getByTestId('email'), {
        target: { value: 'testUser@email.com' }
      });
      fireEvent.change(screen.getByTestId('name'), { target: { value: 'test User' } });
      fireEvent.change(screen.getByTestId('password'), { target: { value: '123456' } });
      fireEvent.change(screen.getByTestId('passwordConfirmation'), {
        target: { value: '123456' }
      });
      fireEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Hubo problemas en la comunicación con el servidor/)
      ).toBeInTheDocument();
      expect(renderResult).toMatchSnapshot();
    });
  });

  describe('Test de validación del formulario', () => {
    beforeEach(() => {
      cleanup();
    });
    test('Debe mostrar mensaje de validación cuando no se ingresa nombre', async () => {
      renderWithProviders(<Register />);
      act(() => {
        fireEvent.change(screen.getByTestId('email'), {
          target: { value: 'miemail@validemail.com' }
        });
        fireEvent.change(screen.getByTestId('password'), { target: { value: '123456' } });
        fireEvent.change(screen.getByTestId('passwordConfirmation'), {
          target: { value: '123456' }
        });
        fireEvent.click(screen.getByText('Registrar'));
      });

      await waitFor(() => {
        expect(screen.getByText(/ingresar el nombre del usuario/)).toBeInTheDocument();
      });
    });

    test('Debe mostrar mensaje de validación cuando no se ingresa el email', async () => {
      renderWithProviders(<Register />);
      act(() => {
        fireEvent.change(screen.getByTestId('name'), {
          target: { value: 'mi nombre' }
        });
        fireEvent.change(screen.getByTestId('password'), { target: { value: '123456' } });
        fireEvent.change(screen.getByTestId('passwordConfirmation'), {
          target: { value: '123456' }
        });
        fireEvent.click(screen.getByText('Registrar'));
      });

      await waitFor(() => {
        expect(screen.getByText(/ingresar el email del usuario/)).toBeInTheDocument();
      });
    });

    test('Debe mostrar mensaje de validación cuando se ingresa formato incorrecto del email', async () => {
      renderWithProviders(<Register />);
      act(() => {
        fireEvent.change(screen.getByTestId('name'), { target: { value: 'mi nombre' } });
        fireEvent.change(screen.getByTestId('email'), { target: { value: 'miemail.sinformato' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: '123456' } });
        fireEvent.change(screen.getByTestId('passwordConfirmation'), {
          target: { value: '123456' }
        });
        fireEvent.click(screen.getByText('Registrar'));
      });

      await waitFor(() => {
        expect(screen.getByText(/Formato incorrecto ingresado del email/)).toBeInTheDocument();
      });
    });

    test('Debe mostrar mensaje de validación cuando no se ingresa el password', async () => {
      renderWithProviders(<Register />);
      act(() => {
        fireEvent.change(screen.getByTestId('name'), { target: { value: 'mi nombre' } });
        fireEvent.change(screen.getByTestId('email'), { target: { value: 'mi@email.com' } });
        fireEvent.change(screen.getByTestId('passwordConfirmation'), {
          target: { value: '123456' }
        });
        fireEvent.click(screen.getByText('Registrar'));
      });

      await waitFor(() => {
        expect(screen.getByText(/ingresar el password del usuario/)).toBeInTheDocument();
      });
    });

    test('Debe mostrar mensaje de validación cuando no se ingresa el password confirmation', async () => {
      renderWithProviders(<Register />);
      act(() => {
        fireEvent.change(screen.getByTestId('name'), { target: { value: 'mi nombre' } });
        fireEvent.change(screen.getByTestId('email'), { target: { value: 'mi@email.com' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: '123456' } });
        fireEvent.click(screen.getByText('Registrar'));
      });

      await waitFor(() => {
        expect(
          screen.getByText(/ingresar la confirmación de password del usuario/)
        ).toBeInTheDocument();
      });
    });

    test('Debe mostrar mensaje de validación cuando el password Confirmation no es igual al password', async () => {
      renderWithProviders(<Register />);
      act(() => {
        fireEvent.change(screen.getByTestId('name'), { target: { value: 'mi nombre' } });
        fireEvent.change(screen.getByTestId('email'), { target: { value: 'mi@email.com' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: '123456' } });
        fireEvent.change(screen.getByTestId('passwordConfirmation'), {
          target: { value: '12345678910' }
        });
        fireEvent.click(screen.getByText('Registrar'));
      });

      await waitFor(() => {
        expect(screen.getByText(/Las contraseñas ingresadas no son iguales/)).toBeInTheDocument();
      });
    });
  });
});
