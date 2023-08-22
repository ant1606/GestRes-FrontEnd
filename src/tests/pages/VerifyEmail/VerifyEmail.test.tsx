import { VerifyEmail } from '@/pages/VerifyEmail/VerifyEmail';
import { setServiceVerifyEmailResponseSuccess } from '@/tests/mocks/verifyEmail.handlers';
import { renderWithProviders } from '@/tests/utils/renderWithProvider';
import { cleanup, waitFor } from '@testing-library/react';
import Cookies from 'js-cookie';
import { Route, Routes } from 'react-router-dom';

describe('Test en VerifyEmail', () => {
  beforeEach(() => {
    cleanup();
    setServiceVerifyEmailResponseSuccess(true);
  });

  test('VerifyEmail debe renderizarse', () => {
    const wrapper = renderWithProviders(
      <Routes>
        <Route path="/verifyEmail/:id/:hash" element={<VerifyEmail />} />
      </Routes>,
      undefined,
      ['/verifyEmail/1/miHash']
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  test('Debe lanzar error si el id en la ruta es 0, vacio no es valido', async () => {
    const id = ' ';
    const hash = 'miHash';
    const wrapper = renderWithProviders(
      <Routes>
        <Route path="/verifyEmail/:id/:hash" element={<VerifyEmail />} />
        {/* <Route path="*" element={<>Pagina no existe</>} /> */}
      </Routes>,
      undefined,
      [`/verifyEmail/${id}/${hash}`]
    );
    await waitFor(() => {
      expect(wrapper.getByText('No se identifico al usuario')).toBeInTheDocument();
    });
    wrapper.unmount();
  });

  test('Debe lanzar error si el hash en la ruta es vacio o no valido', async () => {
    const id = '123';
    const hash = ' ';
    const wrapper = renderWithProviders(
      <Routes>
        <Route path="/verifyEmail/:id/:hash" element={<VerifyEmail />} />
        {/* <Route path="*" element={<>Pagina no existe</>} /> */}
      </Routes>,
      undefined,
      [`/verifyEmail/${id}/${hash}`]
    );
    await waitFor(() => {
      expect(wrapper.getByText('No se identifico al usuario')).toBeInTheDocument();
    });
    wrapper.unmount();
  });

  test('Debe mostrar una notificación si se obtiene un error por parte de la API ', async () => {
    setServiceVerifyEmailResponseSuccess(false);
    const id = '123';
    const hash = 'miHash';
    const wrapper = renderWithProviders(
      <Routes>
        <Route path="/verifyEmail/:id/:hash" element={<VerifyEmail />} />
        {/* <Route path="*" element={<>Pagina no existe</>} /> */}
      </Routes>,
      undefined,
      [`/verifyEmail/${id}/${hash}`]
    );
    await waitFor(() => {
      expect(
        wrapper.getByText('Hubo problemas en la comunicación con el servidor')
      ).toBeInTheDocument();
    });
    wrapper.unmount();
  });

  test('Debe mostrar app/dashboard si se verifica satisfactoriamente el email del usuario', async () => {
    const id = '123';
    const hash = 'miHash';
    setServiceVerifyEmailResponseSuccess(true);
    const wrapper = renderWithProviders(
      <Routes>
        <Route path="/verifyEmail/:id/:hash" element={<VerifyEmail />} />
        <Route path="/app/dashboard" element={<>Dashboard</>} />
      </Routes>,
      undefined,
      [`/verifyEmail/${id}/${hash}`]
    );
    await waitFor(() => {
      expect(wrapper.getByText('Dashboard')).toBeInTheDocument();
    });
    wrapper.unmount();
  });

  test('Debe almacenar en cookie y en el store la información del usuario si se verifica satisfactoriamente el email del usuario', async () => {
    const id = '123';
    const hash = 'miHash';
    setServiceVerifyEmailResponseSuccess(true);
    const wrapper = renderWithProviders(
      <Routes>
        <Route path="/verifyEmail/:id/:hash" element={<VerifyEmail />} />
        <Route path="/app/dashboard" element={<>Dashboard</>} />
      </Routes>,
      undefined,
      [`/verifyEmail/${id}/${hash}`]
    );
    await waitFor(() => {
      expect(Cookies.get('bearerToken')).toBe('miToken');
      expect(localStorage.getItem('user')).not.toBe(undefined);
    });
    wrapper.unmount();
  });
});
