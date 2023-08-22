export const focusInput = (querySelector: string): void => {
  const nombreElement = document.querySelector(querySelector);
  if (nombreElement !== null && nombreElement instanceof HTMLInputElement) {
    nombreElement.focus();
    // nombreElement.select();
  }
};

export const setDataInput = (querySelector: string, val: string): void => {
  const nombreElement = document.querySelector(querySelector);
  if (nombreElement !== null && nombreElement instanceof HTMLInputElement) {
    nombreElement.value = val;
  }
};
