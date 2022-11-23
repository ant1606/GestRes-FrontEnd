import React from 'react'
import { mdiPencil, mdiTrashCan } from '@mdi/js'
import Icon from '@mdi/react'
import useTag from '../../../Context/TagContext'
import { useSearchParams } from 'react-router-dom'
import {toastNotifications} from "../../../helpers/notificationsSwal.js";


const TagTableRow = ({ tag }) => {

  const {selectedTag, addNewError, destroyTag, loadTags, setIsLoading } = useTag();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickEdit = (tag) => {
    addNewError([]);
    selectedTag(tag);

    document.querySelector('#nombre').value = tag.nombre;
    document.querySelector('#nombre').select();
  }

  const handleClickDelete = async (tag) => {
    let result =  await toastNotifications().modalDeleteConfirm(tag);
    if(result){
      setIsLoading(true);
      await destroyTag(tag);
      loadTags(searchParams.toString());
      setIsLoading(false);
    }
  }

  return (
    <tr>
      <td className='w-48 h-14'>
        <div className="flex justify-around items-center px-3 py-2">
          <button
            className="w-8 h-8  flex justify-center items-center bg-yellow-400 rounded-lg"
            onClick={() => { handleClickEdit(tag) }}
          >
            <Icon path={mdiPencil}
              title="Edit"
              size={1}
              color="white"
            />
          </button>
          <button
            className="w-8 h-8  flex justify-center items-center bg-red-600 rounded-lg"
            onClick={() => { handleClickDelete(tag) }}
          >
            <Icon path={mdiTrashCan}
              title="Delete"
              size={1}
              color="white"
            />
          </button>
        </div>
      </td>
      <td className='max-h-14 max-w-xs'>
        <div className='flex justify-center items-center'>
          <span className={`${!!tag.estilos ? tag.estilos : "bg-gray-900 text-white" } m-0 h-7 shrink px-4 py-1 text-sm font-bold rounded-2xl transform-uppercase`}>
            {tag.nombre}
          </span>
        </div>
      </td>
    </tr>
  )
}

export default TagTableRow