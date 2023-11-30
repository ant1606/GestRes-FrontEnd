import { renderWithProviders } from '#/tests/utils/renderWithProvider';
import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '#/pages/Login';
import {
  setServiceLoginResponseSuccess,
  setserviceLoginUserWithRememberToken
} from '#/tests/mocks/login.handlers';
import { Route, Routes } from 'react-router-dom';
import Register from '#/pages/Register';
import PasswordForget from '#/pages/PasswordForget';

describe('Test en Login', () => {
  beforeEach(() => {
    cleanup();
    // Cookies.remove('bearerToken');
    localStorage.clear();
    sessionStorage.clear();
    setServiceLoginResponseSuccess(true);
    setserviceLoginUserWithRememberToken(true);
  });

  afterAll(() => {
    cleanup();
    // Cookies.remove('bearerToken');
    localStorage.clear();
    sessionStorage.clear();
    setServiceLoginResponseSuccess(true);
    setserviceLoginUserWithRememberToken(true);
  });

  test('Debe almacenarse bearerToken y el rememberToken debe ser null si se logearon correctamente y NO marcaron casilla de recordarme', async () => {
    const wrapper = renderWithProviders(<Login />);
    setServiceLoginResponseSuccess(true);
    fireEvent.change(wrapper.getByTestId('email'), { target: { value: 'miemail@email.com' } });
    fireEvent.change(wrapper.getByTestId('password'), { target: { value: 'password' } });
    fireEvent.click(wrapper.getByText('Ingresar'));
    await waitFor(() => {
      expect(sessionStorage.getItem('bearerToken')).toEqual('miToken');
      expect(localStorage.getItem('rememberToken')).toEqual(null);
    });
    wrapper.unmount();
  });

  test('Debe almacenarse bearerToken y rememberToken si se logearon correctamente y marcaron casilla de recordarme', async () => {
    const wrapper = renderWithProviders(<Login />);
    setServiceLoginResponseSuccess(true);
    setserviceLoginUserWithRememberToken(true);
    const user = userEvent.setup();
    await user.type(wrapper.getByTestId('email'), 'miemail@email.com');
    await user.type(wrapper.getByTestId('password'), 'password');
    await user.click(wrapper.getByTestId('remember_me'));
    await user.click(wrapper.getByText('Ingresar'));

    await waitFor(() => {
      expect(sessionStorage.getItem('bearerToken')).toEqual('miToken');
      expect(localStorage.getItem('rememberToken')).toEqual('miRememberToken');
    });
    wrapper.unmount();
  });

  test('Debe mostrar ventana de diálogo con el mensaje de error al recibir un error por parte de la API', async () => {
    const wrapper = renderWithProviders(<Login />);

    setServiceLoginResponseSuccess(false);
    fireEvent.change(wrapper.getByTestId('email'), { target: { value: 'miemail@email.com' } });
    fireEvent.change(wrapper.getByTestId('password'), { target: { value: 'password' } });
    // fireEvent.change(wrapper.getByTestId('remember_me'), { target: { checked: true } });
    fireEvent.click(wrapper.getByText('Ingresar'));

    await waitFor(() => {
      expect(wrapper.getByText('No se encontro el remembertoken')).toBeInTheDocument();
      expect(sessionStorage.getItem('bearerToken')).toEqual(null);
      expect(localStorage.getItem('rememberToken')).toEqual(null);
    });
    wrapper.unmount();
  });

  test('Debe mostrar página de dashboard si se logearon correctamente', async () => {
    const wrapper = renderWithProviders(
      <>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="app/dashboard" element={<>dashboard</>} />
        </Routes>
      </>,
      undefined,
      ['/login']
    );
    setServiceLoginResponseSuccess(true);
    setserviceLoginUserWithRememberToken(true);
    const user = userEvent.setup();
    await user.type(wrapper.getByTestId('email'), 'miemail@email.com');
    await user.type(wrapper.getByTestId('password'), 'password');
    await user.click(wrapper.getByText('Ingresar'));

    expect(sessionStorage.getItem('bearerToken')).toEqual('miToken');
    // Es null porque no se marco la casilla rememberMe
    expect(localStorage.getItem('rememberToken')).toEqual(null);
    await waitFor(async () => {
      expect(wrapper.getByText(/dashboard/i)).toBeInTheDocument();
    });
    wrapper.unmount();
  });

  test('Debe mostrarse formulario de registro al dar click en la opción registrarse', async () => {
    const wrapper = renderWithProviders(
      <>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </>,
      undefined,
      ['/login']
    );

    expect(wrapper.getByText(/login/i)).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(wrapper.getByText('Registrate'));
    await waitFor(() => {
      expect(wrapper.getByText(/registro/i)).toBeInTheDocument();
    });
    wrapper.unmount();
  });

  test('Debe mostrarse formulario de recuperación de contraseña al marcar el link de Olvido su contraseña', async () => {
    const wrapper = renderWithProviders(
      <>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="forget-password" element={<PasswordForget />} />
        </Routes>
      </>,
      undefined,
      ['/login']
    );

    expect(wrapper.getByText(/login/i)).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(wrapper.getByText('¿Olvidó su contraseña?'));
    await waitFor(() => {
      expect(wrapper.getByText(/ingrese el email del usuario/i)).toBeInTheDocument();
    });
    wrapper.unmount();
  });

  describe('Tests de validación del formulario', () => {
    beforeEach(() => {
      cleanup();
    });

    test('Debe mostrar un mensaje de validación cuando no se ingresa el correo del usuario', async () => {
      renderWithProviders(<Login />, undefined, ['/login']);
      act(() => {
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });
        fireEvent.click(screen.getByText('Ingresar'));
      });
      await waitFor(() => {
        expect(screen.getByText(/debe ingresar el email del usuario/i)).toBeInTheDocument();
      });
    });

    test('Debe mostrar un mensaje de validación cuando se ingresa un correo con formato no valido', async () => {
      renderWithProviders(<Login />, undefined, ['/login']);
      act(() => {
        fireEvent.change(screen.getByTestId('email'), { target: { value: 'emailNoValido.com' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });
        fireEvent.click(screen.getByText('Ingresar'));
      });
      await waitFor(() => {
        expect(screen.getByText(/formato incorrecto ingresado del email/i)).toBeInTheDocument();
      });
    });

    test('Debe mostrar un mensaje de validación cuando no se ingresa el password del usuario', async () => {
      renderWithProviders(<Login />, undefined, ['/login']);
      act(() => {
        fireEvent.change(screen.getByTestId('email'), { target: { value: 'mi@mail.com' } });
        fireEvent.click(screen.getByText('Ingresar'));
      });
      await waitFor(() => {
        expect(screen.getByText(/debe ingresar el password del usuario/i)).toBeInTheDocument();
      });
    });
  });
});
