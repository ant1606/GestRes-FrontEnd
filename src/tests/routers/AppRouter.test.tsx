import { cleanup, screen, waitFor } from '#/tests/utils/test-utils';
import AppRouter from '#/routers/AppRouter';
import { renderWithProviders } from '../utils/renderWithProvider';
import {
  setServiceLoginResponseSuccess,
  setServiceRememberResponseSuccess,
  setServiceRememberUserVerified
} from '../mocks/login.handlers';
import { encryptUserData } from '#/utilities/authenticationManagement';
import { type RootState, setupStore } from '#/redux/store';
import { settings } from '#/redux/slice/settingsSlice';

describe('AppRouter test', () => {
  const BEARER_TOKEN = 'bearerToken';
  const REMEMBER_ME_TOKEN = 'rememberToken';

  beforeEach(() => {
    cleanup();
    localStorage.clear();
    sessionStorage.clear();
  });

  // TODO Corregir los test a las nuevas aproximaciones de AuthGuard, PublicGuard y useCheckAuthenticationUsers
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
    sessionStorage.setItem(BEARER_TOKEN, 'miBearerToken');
    setServiceRememberUserVerified(false);
    localStorage.setItem(
      'user',
      encryptUserData(
        JSON.stringify({
          id: '1',
          name: 'userTest',
          email: 'test@mail.com',
          isVerified: false,
          rememberToken: null
        })
      )
    );
    // Creando el store para el test
    const preloadedState: RootState = {
      ui: {
        loadingState: false,
        collapseSidebar: false,
        titleBarColor: 'test',
        titleBarContent: 'test'
      },
      authentication: {
        id: 1,
        name: 'userTest',
        email: 'test@mail.com',
        isVerified: false,
        isLogged: true
      },
      settings: {
        settingsStatus: [],
        settingsType: [],
        settingsUnitMeasureProgress: []
      }
    };
    const store = setupStore(preloadedState);

    const wrapper = renderWithProviders(<AppRouter />, { preloadedState, store }, [
      '/app/dashboard'
    ]);

    await waitFor(() => {
      expect(screen.getByText(/verificar tu correo/i)).toBeDefined();
      wrapper.unmount();
    });
  });

  test('Mostrar VerifyEmail cuando el rememberToken existe y el usuario no ha sido verificado', async () => {
    // TODO Verificar este test, ya que aun no he testeado la revisión del rememerToken
    localStorage.setItem(REMEMBER_ME_TOKEN, 'rememberTokenValido');
    setServiceRememberUserVerified(false);
    setServiceRememberResponseSuccess(true);
    // Creando el store para el test
    const preloadedState: RootState = {
      ui: {
        loadingState: false,
        collapseSidebar: false,
        titleBarColor: 'test',
        titleBarContent: 'test'
      },
      authentication: {
        id: 1,
        name: 'userTest',
        email: 'test@mail.com',
        isVerified: false,
        isLogged: true
      },
      settings: {
        settingsStatus: [],
        settingsType: [],
        settingsUnitMeasureProgress: []
      }
    };
    const store = setupStore(preloadedState);
    const wrapper = renderWithProviders(<AppRouter />, { preloadedState, store }, [
      '/app/dashboard'
    ]);
    await waitFor(() => {
      expect(screen.getByText(/Debes verificar tu correo/i)).toBeDefined();
      wrapper.unmount();
    });
  });

  test('Debe mostrar app/dashboard cuando existe el bearerToken y el usuario esta verificado', async () => {
    // TODO Si muestra dashboard, pero que obtener las llamadas a los endpoints de los paneles del dashboard y eso genera error
    sessionStorage.setItem(BEARER_TOKEN, 'miBearerToken');
    localStorage.setItem(
      'user',
      encryptUserData(
        JSON.stringify({
          id: '1',
          name: 'userTest',
          email: 'test@mail.com',
          isVerified: true,
          rememberToken: null
        })
      )
    );
    const preloadedState: RootState = {
      ui: {
        loadingState: false,
        collapseSidebar: false,
        titleBarColor: 'test',
        titleBarContent: 'test'
      },
      authentication: {
        id: 1,
        name: 'userTest',
        email: 'test@mail.com',
        isVerified: true,
        isLogged: true
      },
      settings: {
        settingsStatus: [],
        settingsType: [],
        settingsUnitMeasureProgress: []
      }
    };
    const store = setupStore(preloadedState);
    const wrapper = renderWithProviders(<AppRouter />, { preloadedState, store }, [
      '/app/dashboard'
    ]);
    await waitFor(() => {
      expect(wrapper.getByText(/gestor de recursos/i)).toBeInTheDocument();
      wrapper.unmount();
    });
  });

  // test('Debe mostrar app/dashboard cuando existe rememberToken y el usuario esta verificado', async () => {
  //   localStorage.setItem(REMEMBER_ME_TOKEN, 'MiRememberToken');
  //   setServiceRememberUserVerified(true);
  //   setServiceRememberResponseSuccess(true);
  //   const wrapper = renderWithProviders(<AppRouter />);
  //   await waitFor(() => {
  //     expect(wrapper.getByText(/dashboard/i)).toBeDefined();
  //     wrapper.unmount();
  //   });
  // });
});
