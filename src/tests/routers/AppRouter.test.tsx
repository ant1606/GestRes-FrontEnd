import { deleteCookie, getCookie, setCookie } from '@/utilities/manageCookies';
import { findByText, render, screen, waitFor } from '@/tests/utils/test-utils';
import AppRouter from '@/routers/AppRouter';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '@/redux/slice/uiSlice';
import authenticationReducer from '@/redux/slice/authenticationSlice';
import { renderWithProviders } from '../utils/renderWithProvider';

describe('AppRouter test', () => {
  const BEARER_TOKEN = 'bearerToken';
  const REMEMBER_ME_TOKEN = 'rememberToken';

  beforeEach(() => {
    deleteCookie(BEARER_TOKEN);
    localStorage.removeItem(REMEMBER_ME_TOKEN);
    localStorage.removeItem('user');
  });

  // test('probando servicio remember', async () => {
  //   setServiceRememberResponseSuccess(false);
  //   const data = await refreshUserFromRememberToken('miToken');
  //   console.log(data, 'Obtuve datos');
  //   // console.log(`${import.meta.env.VITE_BACKEND_ENDPOINT}/v1/remember`);
  // });

  test.todo('should show login when no exists bearerToken and rememberToken', () => {
    // setCookie(BEARER_TOKEN, 'miToken');
    // localStorage.setItem(REMEMBER_ME_TOKEN, 'miTokenRemember');
    // const preloadedState = {
    //   authentication: {
    //     id: 999,
    //     name: '',
    //     email: '',
    //     isVerified: false,
    //     isLogged: false
    //   },
    //   ui: {
    //     value: false
    //   }
    // };
    // const storeMock = configureStore({
    //   reducer: {
    //     ui: uiReducer,
    //     authentication: authenticationReducer
    //   },
    //   preloadedState
    // });
    renderWithProviders(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );
    // render(
    //   <Provider store={storeMock}>

    //   </Provider>
    // );
    // console.log(screen);
    expect(screen.getByText(/login/i)).toBeDefined();
  });

  test('should show app/dashboard when exists bearerToken', async () => {
    setCookie(BEARER_TOKEN, 'miToken');
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

    renderWithProviders(<AppRouter />);

    await waitFor(
      () => {
        expect(screen.getAllByText(/dashboard/i)).toBeDefined();
      },
      {
        timeout: 5000
      }
    );

    screen.debug();
  });

  test.todo(
    'should show app/dashboard when does not exists bearerToken and exists rememberToken',
    () => {
      expect(1);
    }
  );
});
