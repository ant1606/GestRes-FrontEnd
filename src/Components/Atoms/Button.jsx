import React from 'react'

const Button = ({text}) => {
  return (
    <button className='bg-gray-900 rounded-xl text-white py-2 px-5 text-2xl font-medium
        hover:bg-gray-800 '>
          {text}
    </button>
  )
}

export default Button