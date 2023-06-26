import React, { useContext, useEffect, useState } from 'react';
import TitleContext from '../../../Context/TitleContext';
import RecourseForm from '../../Organisms/Recourse/RecourseForm.jsx';
import StatusMain from '../../Organisms/Status/StatusMain.jsx';
import ProgressMain from '../../Organisms/Progress/ProgressMain.jsx';
import useRecourse from '../../../Context/RecourseContext.jsx';
import { useParams } from 'react-router-dom';

const RecourseScreenShow = () => {
  const { changeTitle } = useContext(TitleContext);
  const [toggleTab, setToggleTab] = useState(1);
  const [showModalState, setShowModalState] = useState(false);
  const [showModalProgress, setShowModalProgress] = useState(false);
  const { getRecourse, cleanRecourseActive } = useRecourse();
  // const [searchParams, setSearchParamas] = useSearchParams();
  let { idrecurso } = useParams();

  useEffect(() => {
    changeTitle('Recursos Educativos / Ver');
    getRecourse(idrecurso);
    return () => {
      cleanRecourseActive();
    };
  }, []);

  //TODO Cambiar el modalState a un contexto de UI para toda la aplicacion
  const handleClickButtonState = () => {
    setShowModalState(!showModalState);
  };

  const handleClickButtonProgress = () => {
    setShowModalProgress(!showModalProgress);
  };

  return (
    <>
      {/* Tabs Header */}
      <div className='flex text-gray-900 font-semibold max-w-full'>
        <div
          className={` ${toggleTab === 1 ? 'text-white bg-gray-900 border-b-0' : ''
            } cursor-pointer grow border-2 text-center uppercase border-gray-900 py-3 px-10 `}
          onClick={() => setToggleTab(1)}
        >
          Detalles
        </div>
        <div
          className={`${toggleTab === 2 ? 'text-white bg-gray-900 border-b-0' : ''
            } cursor-pointer grow border-2 text-center uppercase border-gray-900 border-l-0 py-3 px-10`}
          onClick={() => setToggleTab(2)}
        >
          Estado
        </div>
        <div
          className={`${toggleTab === 3 ? 'text-white bg-gray-900 border-b-0' : ''
            } cursor-pointer grow border-2 text-center uppercase border-gray-900 border-l-0 py-3 px-10`}
          onClick={() => setToggleTab(3)}
        >
          Progreso
        </div>
      </div>
      {/* Fin Tabs Header */}

      {/* Tabs Content */}
      <div className='border-2  h-[32rem] border-gray-900 border-t-0 overflow-y-scroll px-8 py-5'>
        <div className={`${toggleTab === 1 ? '' : 'hidden'}`}>
          <RecourseForm />
        </div>

        <div className={`${toggleTab === 2 ? '' : 'hidden'}`}>
          <StatusMain
            handleClickParent={handleClickButtonState}
            modalState={showModalState}
          />
        </div>

        <div className={`${toggleTab === 3 ? '' : 'hidden'}`}>
          <div>
            <ProgressMain
              handleClickParent={handleClickButtonProgress}
              modalState={showModalProgress}
            />
          </div>
        </div>
      </div>
      {/* Fin Tabs Content */}
    </>
  );
};

export default RecourseScreenShow;
