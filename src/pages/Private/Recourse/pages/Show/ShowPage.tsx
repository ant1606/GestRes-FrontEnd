import React, { useEffect, useState } from 'react';
import Form from '../../components/Form';
import { useRecourse } from '../../context/recourse.context';
import { useAppDispatch } from '@/hooks/redux';
import { changeColorTitleBar } from '@/redux/slice/uiSlice';
import { StatusProvider } from '../../components/Status/context/status.context';
import StatusRecourse from '../../components/Status';
import { ProgressProvider } from '../../components/Progress/context/progress.context';
import ProgressRecourse from '../../components/Progress';

export const ShowPage: React.FC = () => {
  const { cleanSelectedRecourse } = useRecourse();
  const [toggleTab, setToggleTab] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(changeColorTitleBar(null));
      cleanSelectedRecourse();
    };
  }, []);

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
          <StatusProvider>
            <StatusRecourse />
          </StatusProvider>
        </div>

        <div className={`${toggleTab === 3 ? '' : 'hidden'}`}>
          <div>
            <ProgressProvider>
              <ProgressRecourse />
            </ProgressProvider>
          </div>
        </div>
      </div>
      {/* Fin Tabs Content */}
    </>
  );
};
