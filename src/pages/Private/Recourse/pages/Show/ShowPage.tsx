import React, { useEffect, useState } from 'react';
import Form from '../../components/Form';
import { useRecourse } from '../../context/recourse.context';

export const ShowPage: React.FC = () => {
  const { cleanSelectedRecourse } = useRecourse();
  const [toggleTab, setToggleTab] = useState(1);
  const [showModalState, setShowModalState] = useState(false);
  const [showModalProgress, setShowModalProgress] = useState(false);

  useEffect(() => {
    return () => {
      cleanSelectedRecourse();
    };
  }, []);

  // TODO Cambiar el modalState a un contexto de UI para toda la aplicacion
  const handleClickButtonState = (): void => {
    setShowModalState(!showModalState);
  };

  const handleClickButtonProgress = (): void => {
    setShowModalProgress(!showModalProgress);
  };
  return (
    <>
      {/* Tabs Header */}
      <div className="flex text-gray-900 font-semibold max-w-full">
        <button
          className={` 
          ${toggleTab === 1 ? 'text-white bg-gray-900 border-b-0' : ''}
          cursor-pointer grow border-2 text-center uppercase border-gray-900 py-3 px-10 `}
          onClick={() => {
            setToggleTab(1);
          }}>
          Detalles
        </button>
        <button
          className={` 
          ${toggleTab === 2 ? 'text-white bg-gray-900 border-b-0' : ''}
          cursor-pointer grow border-2 text-center uppercase border-gray-900 border-l-0 py-3 px-10`}
          onClick={() => {
            setToggleTab(2);
          }}>
          Estado
        </button>
        <button
          className={`
          ${toggleTab === 3 ? 'text-white bg-gray-900 border-b-0' : ''} 
          cursor-pointer grow border-2 text-center uppercase border-gray-900 border-l-0 py-3 px-10`}
          onClick={() => {
            setToggleTab(3);
          }}>
          Progreso
        </button>
      </div>
      {/* Fin Tabs Header */}

      {/* Tabs Content */}
      <div className="border-2  h-[32rem] border-gray-900 border-t-0 overflow-y-scroll px-8 py-5">
        <div className={`${toggleTab === 1 ? '' : 'hidden'}`}>
          <Form isShow={true} />
        </div>

        <div className={`${toggleTab === 2 ? '' : 'hidden'}`}>
          <p>Status</p>
          {/* <StatusMain handleClickParent={handleClickButtonState} modalState={showModalState} /> */}
        </div>

        <div className={`${toggleTab === 3 ? '' : 'hidden'}`}>
          <div>
            <p>Progress</p>
            {/* <ProgressMain
              handleClickParent={handleClickButtonProgress}
              modalState={showModalProgress}
            /> */}
          </div>
        </div>
      </div>
      {/* Fin Tabs Content */}
    </>
  );
};
