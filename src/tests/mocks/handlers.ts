import { handlersLogin } from './login.handlers';
import { handlersRegister } from './register.handlers';

export const handlers = [...handlersLogin, ...handlersRegister];
