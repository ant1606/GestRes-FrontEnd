import React from 'react'

const Button = ({text, btnType, handleClick}) => {

  const btnColors = {
    main: 'bg-gray-900',
    danger: 'bg-red-600',
    warning: 'bg-yellow-400',
    default: 'bg-blue-500',
  }

  
  return (
    <button className={`${btnColors[btnType]} rounded-xl text-white py-2 px-5 text-2xl font-medium
        hover:bg-gray-800`} onClick={handleClick}>
          {text}
    </button>
  )
}

// Button.propTypes = {
//   btnType : "string"
// }

Button.defaultProps = {
  btnType : "main"
}

export default Button