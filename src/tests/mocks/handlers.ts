import { handlersForgetPassword } from './forgetPassword.handlers';
import { handlersLogin } from './login.handlers';
import { handlersRegister } from './register.handlers';
import { handlersVerifyEmail } from './verifyEmail.handlers';

export const handlers = [
  ...handlersLogin,
  ...handlersRegister,
  ...handlersVerifyEmail,
  ...handlersForgetPassword
];
