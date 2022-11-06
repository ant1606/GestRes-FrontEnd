import React from 'react'
import { mdiPencil, mdiTrashCan } from '@mdi/js'
import Icon from '@mdi/react'
import useTag from '../../../Context/TagContext'
import { useSearchParams } from 'react-router-dom'


const TableRow = ({tag }) => {

  const {deletedTag, selectedTag, loadTags} = useTag();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickEdit = (tag) => {
    selectedTag(tag);
    
    document.querySelector('#nombre').value = tag.nombre;
    document.querySelector('#nombre').select();
  }

  const handleClickDelete = (tag) => {
    deletedTag(tag);
    loadTags(searchParams.toString());
    // setToggleDeleteModal(!toggleDeleteModal);
  }

  return (
      <tr>
      <td className='w-48 h-14'>
        <div className="flex justify-around items-center px-3 py-2">
          <button 
            className="w-8 h-8  flex justify-center items-center bg-yellow-400 rounded-lg"
            onClick ={() => {handleClickEdit(tag)}}
          >
            <Icon path={mdiPencil}
              title="Edit"
              size={1}
              color="white"
            />
          </button>
          <button 
            className="w-8 h-8  flex justify-center items-center bg-red-600 rounded-lg"
            onClick={() => {handleClickDelete(tag)}}
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
          <span className='bg-gray-900 m-0 h-7 shrink px-4 py-1 text-sm font-bold text-white rounded-2xl transform-uppercase'>
            {tag.nombre}
          </span>
        </div>
      </td>
    </tr>
  )
}

export default TableRow