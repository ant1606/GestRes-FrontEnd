import React from 'react';
import { useTag } from '../../context/tag.context';
import { useSearchParams } from 'react-router-dom';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { useAppDispatch } from '#/hooks/redux';
import { isLoading } from '#/redux/slice/uiSlice';
import { focusInput } from '#/utilities/manipulationDom';
import { destroyTag, getTags } from '#/services/tag.services';
import { IconContext } from 'react-icons';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { type TagErrorResponse } from '../../index.types';

interface Prop {
  tag: Tag;
}
const Row: React.FC<Prop> = ({ tag }) => {
  const { selectedTag, resetValidationError, cleanSelectedTag, setTags, addValidationError } =
    useTag();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const handleClickEdit = (tag: Tag): void => {
    resetValidationError();
    selectedTag(tag);
    focusInput('#name');
  };

  const handleClickDelete = async (tag: Tag): Promise<void> => {
    try {
      const result = await toastNotifications().modalDeleteConfirm(tag.name);
      if (!result) return;

      dispatch(isLoading(true));
      const response = await destroyTag(tag);
      if (response.status === 'error') {
        const responseError = response as TagErrorResponse;
        // Errores de validación de campos por parte del backend
        const inputsValidationFromBackend = responseError.details;
        Object.keys(inputsValidationFromBackend).forEach((key) => {
          addValidationError({ [key]: inputsValidationFromBackend[key] });
        });

        // Mensaje de error general por parte del backend
        if (responseError.message !== '') {
          throw new Error(responseError.message);
        }
      } else {
        // const responseSuccess = response as TagSuccessResponse;
        resetValidationError();
        toastNotifications().toastSuccesCustomize(
          `Se elimino la etiqueta ${tag.name} satisfactoriamente`
        );
        cleanSelectedTag();
        const tags = await getTags(searchParams.toString());
        setTags(tags);
      }
    } catch (error: any) {
      toastNotifications().notificationError(error.message);
    } finally {
      dispatch(isLoading(false));
    }
  };

  return (
    <tr>
      <td className="w-48 h-14">
        <div className="flex justify-around items-center px-3 py-2">
          <button
            className="w-8 h-8  flex justify-center items-center bg-yellow-400 rounded-lg"
            onClick={() => {
              handleClickEdit(tag);
            }}>
            <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
              <FaPencilAlt />
            </IconContext.Provider>
          </button>
          <button
            className="w-8 h-8  flex justify-center items-center bg-red-600 rounded-lg"
            onClick={() => {
              handleClickDelete(tag);
            }}>
            <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
              <FaTrashAlt />
            </IconContext.Provider>
          </button>
        </div>
      </td>
      <td className="max-h-14 max-w-xs">
        <div className="flex justify-center items-center">
          <span
            className={` ${tag.style.trim().length > 0 ? tag.style : 'bg-gray-900 text-white'} 
            m-0 h-7 shrink px-4 py-1 text-sm font-bold rounded-2xl transform-uppercase`}>
            {tag.name}
          </span>
        </div>
      </td>
      <td className="max-h-14 max-w-xs">
        <div className="px-3 text-center text-lg text-gray-900 font-semibold">
          <p>{tag.total}</p>
        </div>
      </td>
    </tr>
  );
};

export default Row;
