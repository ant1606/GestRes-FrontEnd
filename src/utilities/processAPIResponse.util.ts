export const processErrorResponse = (error: any): Record<string, string> => {
  const errorContentToArray = Object.entries(error);
  // console.log();
  return errorContentToArray.reduce((acc, current) => {
    let value = current[1];
    if (Array.isArray(value)) {
      value = value.join('\n');
    }
    return {
      ...acc,
      [current[0]]: value
    };
  }, {});
};

// const processErrorAntiguo = (error) => {
//   const processError = err.error.reduce(
//     (previous, current) => ({
//       ...previous,
//       ...Object.entries(current.detail).reduce(
//         (acc, [key, value]) => ({
//           ...acc,
//           [key]: value[0]
//         }),
//         {}
//       )
//     }),
//     {}
//   );
// };
