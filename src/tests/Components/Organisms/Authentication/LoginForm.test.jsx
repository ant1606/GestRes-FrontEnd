import { render } from '../../../utils/test-utils.js';
import LoginForm from '../../../../Components/Organisms/Authentication/LoginForm.jsx';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { act, fireEvent, screen } from '@testing-library/react';
import {
  MockSecurityProvider,
  MockuseSecurity
} from '../../../../Context/__mocks__/SecurityContexts.jsx';
import userEvent from '@testing-library/user-event';

describe('LoginForm Tests', () => {
  describe('Rendering Testing on LoginForm', () => {
    beforeEach(() => {
      render(
        <MockSecurityProvider>
          <MemoryRouter>
            <LoginForm myContext={MockuseSecurity} />
          </MemoryRouter>
        </MockSecurityProvider>
      );
    });

    test('should show LoginForm', () => {
      expect(screen.getByText(/email/i)).toBeDefined();
      expect(screen.getByText(/password/i)).toBeDefined();
      expect(screen.getByText(/recordarme/i)).toBeDefined();
      expect(screen.getByText(/registrate/i)).toBeDefined();
      expect(screen.getByText(/olvidó/i)).toBeDefined();
      expect(screen.getByText(/ingresar/i)).toBeDefined();
    });

    test('should show an error when a email field is empty', () => {
      act(() => {
        fireEvent.change(screen.getByTestId('email'), { target: { value: ' ' } });
      });
      expect(screen.getByText('Debe ingresar el email del usuario')).toBeDefined();
    });

    test('should show an error when user insert an invalid email ', () => {
      act(() => {
        fireEvent.change(screen.getByTestId('email'), {
          target: { value: 'emailwith.wrongformat' }
        });
      });
      expect(screen.getByText('Formato incorrecto ingresado del email')).toBeDefined();
    });

    test('should show an error when a password field is empty', () => {
      act(() => {
        fireEvent.change(screen.getByTestId('password'), { target: { value: ' ' } });
      });
      expect(screen.getByText('Debe ingresar el password del usuario')).toBeDefined();
    });

    test('should show an error when submitted form with a fields empty', async () => {
      await act(() => {
        fireEvent.change(screen.getByTestId('password'), { target: { value: ' ' } });
        fireEvent.change(screen.getByTestId('email'), { target: { value: ' ' } });
        fireEvent.click(screen.getByText('Ingresar'));
      });

      expect(screen.getByText('Debe ingresar el email del usuario')).toBeDefined();
      expect(screen.getByText('Debe ingresar el password del usuario')).toBeDefined();
    });
  });

  test('should redirect to registerPage when user make click on registrarse link', async () => {
    render(
      <MockSecurityProvider>
        <MemoryRouter initialEntries={['/login']}>
          <LoginForm myContext={MockuseSecurity} />
        </MemoryRouter>
      </MockSecurityProvider>
    );
    const userActions = userEvent.setup();

    expect(screen.getByText('Login')).toBeInTheDocument();

    const registrateLink = screen.getByText('Registrate');
    userActions.click(registrateLink);
    screen.debug();
    // await screen.findByText("Registro de Usuario");
  });

  test.todo(
    'should redirecto to forgetPasswordPage when user make click on olvido su contraseña',
    () => {
      // Testear que al dar click en olvidaste contraseña nos redirija a la pagina de forgetPassword
    }
  );

  it('should call logginUser when submitting the form', async () => {
    let logginUserCalled = false;

    const mockUseSecurity = () => ({
      setIsLoading: vi.fn(),
      securityError: {},
      logginUser: vi.fn(),
      addNewError: vi.fn()
    });

    const LoginFormWithSpy = () => {
      const context = mockUseSecurity();

      const logginUser = () => {
        logginUserCalled = true;
        context.logginUser();
        // console.log("llamada al metodo logginUser desde LoginFormWithSpy")
      };

      const myContext = () => {
        return { ...context, logginUser };
      };

      return (
        <MockSecurityProvider>
          <MemoryRouter>
            <LoginForm myContext={myContext} />
          </MemoryRouter>
        </MockSecurityProvider>
      );
    };

    await act(() => {
      render(<LoginFormWithSpy />);
    });

    await act(() => {
      fireEvent.change(screen.getByTestId('email'), {
        target: { value: 'miemail@mail.com' }
      });
      fireEvent.change(screen.getByTestId('password'), {
        target: { value: '1234' }
      });
      fireEvent.click(screen.getByText('Ingresar'));
    });

    expect(logginUserCalled).toBe(true);
  });

  test.todo('should show an error when submitting loggin form with invalid data', () => {
    // Testear que cuando se ingresan credenciales incorrectas, se obtenga un http 422 y un mensaje de error por parte del api (mockear el response)
  });

  test.todo(
    'should save a rememberToken when submittin loggin form and clicked on remember_me option',
    () => {
      // Testear que al dar click en recordar e ingresar con credenciales correctas, se obtenga el remememerToken (mockear el response)
    }
  );
});
