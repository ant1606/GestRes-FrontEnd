import React from 'react';

type btnColorsType = 'main' | 'danger' | 'warning' | 'default';
type btnTypeType = 'button' | 'submit' | 'reset' | undefined;

interface Props {
  text: string;
  btnType: btnColorsType;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type: btnTypeType;
  isDisable?: boolean;
}
// confirmButton:
//           'bg-green-600 rounded-xl text-white py-2 px-5 text-xl font-medium hover:bg-green-700',
//         cancelButton:
//           'bg-red-600 rounded-xl text-white py-2 px-5 text-xl font-medium hover:bg-red-900',
const Button: React.FC<Props> = ({ text, btnType, handleClick, type, isDisable }) => {
  const btnColors = {
    main: 'bg-gray-900 hover:bg-gray-700',
    danger: 'bg-red-700 hover:bg-red-600',
    warning: 'bg-yellow-500 hover:bg-yellow-400',
    default: 'bg-blue-500 hover:bg-blue-400'
  };

  return (
    <button
      className={`
      ${btnColors[btnType].split(' ')[0]} rounded-xl text-white py-2 px-5 text-2xl font-medium
        ${btnColors[btnType].split(' ')[1]} grow disabled:bg-opacity-30`}
      onClick={handleClick}
      type={type}
      disabled={isDisable}>
      {text}
    </button>
  );
};

export default Button;
