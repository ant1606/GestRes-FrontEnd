import { loginReducer } from '#/pages/Login/context/login.reducer';
import { ADD_VALIDATION_ERROR } from '#/pages/Login/context/types';
import { type ActionReducer, type InitialState } from '#/pages/Login/index.types';
import { cleanup } from '@testing-library/react';

describe('Test en login.reducer', () => {
  beforeEach(() => {
    cleanup();
  });

  test('Debe retornar el estado inicial', () => {
    const initialState: InitialState = {
      validationError: {
        email: '',
        password: ''
      }
    };
    const actionReducer: ActionReducer = {
      type: 'NO_ACTION',
      payload: {
        email: '',
        password: ''
      }
    };
    const state = loginReducer(initialState, actionReducer);
    expect(state).toEqual(initialState);
  });

  test('Debe retornar el estado con error en email', () => {
    const initialState: InitialState = {
      validationError: {
        email: '',
        password: ''
      }
    };
    const actionReducer: ActionReducer = {
      type: ADD_VALIDATION_ERROR,
      payload: {
        email: 'el email no es valido'
      }
    };
    const state = loginReducer(initialState, actionReducer);
    expect(state).toEqual({
      validationError: {
        email: 'el email no es valido',
        password: ''
      }
    });
  });

  test('Debe retornar el estado con error en password', () => {
    const initialState: InitialState = {
      validationError: {
        email: '',
        password: ''
      }
    };
    const actionReducer: ActionReducer = {
      type: ADD_VALIDATION_ERROR,
      payload: {
        password: 'Debe ingresar la contraseña'
      }
    };
    const state = loginReducer(initialState, actionReducer);
    expect(state).toEqual({
      validationError: {
        email: '',
        password: 'Debe ingresar la contraseña'
      }
    });
  });

  test('No debe realizar cambios en el state', () => {
    const initialState: InitialState = {
      validationError: {
        email: 'debe ingresar el email',
        password: 'debe ingresar la contraseña'
      }
    };
    const actionReducer: ActionReducer = {
      type: 'NO_ACTION',
      payload: {
        password: 'Me cambias la contraseña'
      }
    };
    const state = loginReducer(initialState, actionReducer);
    expect(state).toEqual(initialState);
  });
});
