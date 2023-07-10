import { cleanup, screen, waitFor } from '@/tests/utils/test-utils';
import AppRouter from '@/routers/AppRouter';
import Cookies from 'js-cookie';
import { renderWithProviders } from '../utils/renderWithProvider';
import {
  setServiceRememberResponseSuccess,
  setServiceRememberUserVerified
} from '../mocks/login.handlers';

describe('AppRouter test', () => {
  const BEARER_TOKEN = 'bearerToken';
  const REMEMBER_ME_TOKEN = 'rememberToken';

  beforeEach(() => {
    cleanup();
    localStorage.clear();
    Cookies.remove(BEARER_TOKEN);
  });

  /**
   * Datos
   * bearerToken, rememberToken, usuario (usuario verificado)
   * [X] Mostrar Login cuando el beareToken y el rememberToken no existe
   * [-] Mostrar Login cuando el bearerToken existe pero no es valido  ***Por evaluar, ya que es local
   * [X] Mostrar Login cuando el rememberToken existe pero no es valido
   * [X] Mostrar VerifyEmail cuando el bearerToken existe y el usuario no ha sido verificado
   * [X] Mostrar VerifyEmail cuando el rememberToken existe y el usuario no ha sido verificado
   * [X] Mostrar app/dashboard cuando existe el bearerToken existe y el usuario esta verificado
   * [X] Mostrar app/dashboard cuando existe rememberToken y el usuario esta verificado
   */

  test('Debe mostrar Login cuando el beareToken y el rememberToken no existe', async () => {
    renderWithProviders(<AppRouter />);
    await waitFor(() => {
      expect(screen.getByText(/login/i)).toBeDefined();
    });
  });

  test('Debe Mostrar Login cuando el rememberToken existe pero no es valido', async () => {
    localStorage.setItem(REMEMBER_ME_TOKEN, 'rememberTokeNoValido');
    setServiceRememberResponseSuccess(false);
    renderWithProviders(<AppRouter />);
    await waitFor(() => {
      expect(screen.getByText(/login/i)).toBeDefined();
    });
  });

  test('Mostrar VerifyEmail cuando el bearerToken existe y el usuario no ha sido verificado', async () => {
    Cookies.set(BEARER_TOKEN, 'miBearerToken');
    setServiceRememberUserVerified(false);
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: '1',
        name: 'userTest',
        email: 'test@mail.com',
        isVerified: false,
        rememberToken: null
      })
    );
    renderWithProviders(<AppRouter />);

    await waitFor(() => {
      expect(screen.getByText(/verificar tu correo/i)).toBeDefined();
    });
  });

  test('Mostrar VerifyEmail cuando el rememberToken existe y el usuario no ha sido verificado', async () => {
    localStorage.setItem(REMEMBER_ME_TOKEN, 'rememberTokenValido');
    setServiceRememberUserVerified(false);
    setServiceRememberResponseSuccess(true);
    renderWithProviders(<AppRouter />);
    await waitFor(() => {
      expect(screen.getByText(/Debes verificar tu correo/i)).toBeDefined();
    });
  });

  test('Debe mostrar app/dashboard cuando existe el bearerToken y el usuario esta verificado', async () => {
    Cookies.set(BEARER_TOKEN, 'miBearerToken');
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: '1',
        name: 'userTest',
        email: 'test@mail.com',
        isVerified: true,
        rememberToken: null
      })
    );
    const wrapper = renderWithProviders(<AppRouter />);
    await waitFor(() => {
      expect(wrapper.getByText(/gestor de recursos/i)).toBeInTheDocument();
      wrapper.unmount();
    });
  });

  test('Debe mostrar app/dashboard cuando existe rememberToken y el usuario esta verificado', async () => {
    localStorage.setItem(REMEMBER_ME_TOKEN, 'MiRememberToken');
    setServiceRememberUserVerified(true);
    setServiceRememberResponseSuccess(true);
    const wrapper = renderWithProviders(<AppRouter />);
    await waitFor(() => {
      expect(wrapper.getByText(/dashboard/i)).toBeDefined();
      wrapper.unmount();
    });
  });
});
