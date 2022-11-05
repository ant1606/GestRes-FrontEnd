import React from 'react'
import { mdiPencil, mdiTrashCan } from '@mdi/js'
import Icon from '@mdi/react'
import useTag from '../../../Context/TagContext'

const TableRow = ({tag }) => {

  const {tagActive, selectedTag} = useTag();

  const handleClickEdit = (tag) => {
    // setEditTag(tag);
    selectedTag(tag);
    // console.log(tagActive);
    document.querySelector('#nombre').value = tag.nombre;
    document.querySelector('#nombre').select();
    // console.log(editTag);
  }

  const handleClickDelete = (tag) => {
    setDeleteTag(tag);
    setToggleDeleteModal(!toggleDeleteModal);
  }

  return (
      <tr key={tag.identificador}>
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