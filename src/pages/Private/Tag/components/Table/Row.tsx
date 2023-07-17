import React from 'react';
import { useTag } from '../../context/tag.context';
import { useSearchParams } from 'react-router-dom';
import { toastNotifications } from '@/utilities/notificationsSwal';
import Icon from '@mdi/react';
import { mdiPencil, mdiTrashCan } from '@mdi/js';
import { useAppDispatch } from '@/hooks/redux';
import { isLoading } from '@/redux/slice/uiSlice';

interface Prop {
  tag: Tag;
}
const Row: React.FC<Prop> = ({ tag }) => {
  const { selectedTag, addNewError } = useTag();
  // const { selectedTag, addNewError, destroyTag, loadTags } = useTag();
  // const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const handleClickEdit = (tag: Tag): void => {
    addNewError([]);
    selectedTag(tag);

    document.querySelector('#nombre').value = tag.nombre;
    document.querySelector('#nombre').select();
  };

  const handleClickDelete = async (tag: Tag): Promise<void> => {
    try {
      const result = await toastNotifications().modalDeleteConfirm(tag);
      if (result) {
        dispatch(isLoading(true));
        // await destroyTag(tag);
        // loadTags(searchParams.toString());
      }
    } catch (error) {
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
            <Icon path={mdiPencil} title="Edit" size={1} color="white" />
          </button>
          <button
            className="w-8 h-8  flex justify-center items-center bg-red-600 rounded-lg"
            onClick={() => {
              handleClickDelete(tag);
            }}>
            <Icon path={mdiTrashCan} title="Delete" size={1} color="white" />
          </button>
        </div>
      </td>
      <td className="max-h-14 max-w-xs">
        <div className="flex justify-center items-center">
          <span
            className={` ${tag.estilos.trim().length > 0 ? tag.estilos : 'bg-gray-900 text-white'} 
            m-0 h-7 shrink px-4 py-1 text-sm font-bold rounded-2xl transform-uppercase`}>
            {tag.nombre}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default Row;
