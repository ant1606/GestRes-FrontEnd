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
};
export default types;
