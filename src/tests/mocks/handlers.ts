import { handlersForgetPassword } from './forgetPassword.handlers';
import { handlersLogin } from './login.handlers';
import { handlersRegister } from './register.handlers';
import { handlersResetPassword } from './resetPassword.handlers';
import { handlersVerifyEmail } from './verifyEmail.handlers';
import { handlersSettings } from './settings.handlers';

export const handlers = [
  ...handlersLogin,
  ...handlersRegister,
  ...handlersVerifyEmail,
  ...handlersForgetPassword,
  ...handlersResetPassword,
  ...handlersSettings
];
