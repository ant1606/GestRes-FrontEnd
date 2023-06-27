import React from 'react';

interface Props {
  text: string;
  btnType: btnColorsType;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type: btnTypeType;
}

type btnColorsType = 'main' | 'danger' | 'warning' | 'default';
type btnTypeType = 'button' | 'submit' | 'reset' | undefined;

// Button.propTypes = {
//   btnType : "string"
// }

// Button.defaultProps = {
//   btnType: 'main',
//   type: 'button'
// };
const Button: React.FC<Props> = ({ text, btnType, handleClick, type }) => {
  const btnColors = {
    main: 'bg-gray-900',
    danger: 'bg-red-600',
    warning: 'bg-yellow-400',
    default: 'bg-blue-500'
  };

  return (
    <button
      className={`${btnColors[btnType]} rounded-xl text-white py-2 px-5 text-2xl font-medium
        hover:bg-gray-800 grow`}
      onClick={handleClick}
      type={type}>
      {text}
    </button>
  );
};

export default Button;
