import React, { useEffect, useState } from 'react'

const Modal = ({title, modalState, handleClickParent, modalContent}) => {
  const [ toggleModal, setToggleModal ] = useState(false);

  const handleClick = (e) =>{
    setToggleModal(!toggleModal);
    handleClickParent(!toggleModal);
  }

  useEffect(() => {
    setToggleModal(modalState)
  }, []);
  
  return (
    <>
    {
      toggleModal && (
      <>
        <div className='modal_background_color h-full w-full absolute 
            top-0 left-0 z-40 flex justify-center items-center ' onClick={handleClick}
        />
        
        <div className={`w-screen h-screen flex justify-center items-center overflow-hidden 
          absolute top-0 left-0 text-gray-900`} >
          <div className='bg-white min-w-[32rem] max-w-4xl max-h-[32rem] z-50 rounded-3xl'>
            <div className='px-7 py-3 flex justify-center items-center border-b-2 gap relative '>
              <p className='uppercase text-center text-2xl font-semibold'>{title}</p>
              <div className='bg-slate-600 p-1 w-7 h-7 flex items-center justify-center rounded-full absolute right-3 top-2 cursor-pointer hover:bg-slate-900' 
                onClick={handleClick}>
                <p className='text-white font-bold'>X</p>
              </div>
            </div>
            <div className='px-7 py-4 max-h-[25rem] overflow-y-scroll'>
              {modalContent}
            </div>
            <div className='px-7 py-3 border-t-2'>
              botones
            </div>
          </div>
        </div>  
      </>
      )
    }
    </>
  )
}

export default Modal