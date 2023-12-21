import React from 'react';

type btnColorsType = 'main' | 'danger' | 'warning' | 'default';
type btnTypeType = 'button' | 'submit' | 'reset' | undefined;

interface Props {
  text: string;
  btnType: btnColorsType;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type: btnTypeType;
  isDisabled?: boolean;
}

const btnColors = {
  main: 'bg-gray-900 hover:bg-gray-700',
  danger: 'bg-red-700 hover:bg-red-600',
  warning: 'bg-yellow-500 hover:bg-yellow-400',
  default: 'bg-blue-500 hover:bg-blue-400'
};

const Button: React.FC<Props> = ({ text, btnType, onClick, type, isDisabled }) => {
  const buttonClasses = `
    ${btnColors[btnType]} rounded-xl text-white py-2 px-5 text-2xl font-medium grow disabled:bg-opacity-30
  `;

  return (
    <button className={buttonClasses} onClick={onClick} type={type} disabled={isDisabled}>
      {text}
    </button>
  );
};

export default Button;
