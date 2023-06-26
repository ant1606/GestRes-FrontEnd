//TODO Normalizar los nombres y dar nombres mas descriptivos a las acciones
const types = {
  tagSave: '[tag] Tag Saved',
  tagSelect: '[tag] Set Tag to activeTag',
  tagUpdate: '[tag] Tag Updated',
  tagDelete: '[tag] Tag Deleted',
  tagDestroy: '[tag] Tag Destroyed',
  tagLoaded: '[tag] Loaded Tag Pagination',
  tagAddError: '[tag] Add Error Message Validation',
  tagSetPerPage: '[tag] Set perPage range search',
  tagIsLoading: '[tag] Set isLoading to Tag',

  settingsLoad: '[settings] Load settings',

  recourseAddError: '[recourse] Add Error Message Validation',
  recourseLoaded: '[recourse] Loaded Recourse Pagination',
  recourseGetData: '[recourse] Get Data from one Recourse show',
  recourseSetPerPage: '[recourse] Set perPage range search',
  recourseCleanActive: '[recourse] Clean Recourse Active',
  recourseSetActive: '[recourse] Set Recourse Active',
  recourseIsLoading: '[recourse] Set isLoading to Recourse',

  securityAddError: '[security] Add Error Message Validation',
  securityUserIsLogged: '[security] Set if the user is login',
  securityUserIsLogout: '[security] Set if the user is logout',
  securityIsLoading: '[security] Set isLoading in module Security',

  userAddError: '[user] Add Error Message Validation',
  userSave: '[user] User Saved',
  userIsLoading: '[user] Set isLoading in module User',
  userForgotPassword:
    '[user] Send email to initiate proccess to Reset Password',
  userResetPassword: '[user] Send new password to proccess to Reset Password'
};
export default types;
