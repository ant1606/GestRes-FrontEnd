
import Field from '../../Atoms/Field'
import Combobox from '../../Atoms/Combobox'
import TextArea from '../../Atoms/TextArea'

const Form = () => {
  return (
    <div className='flex flex-col py-8 gap-10'>
      <Field 
        type="date" 
        label="Fecha" 
        id="fecha"
        classBox=''
      />
      <div className='flex gap-10'>
        <Field 
          type="number" 
          label="Avance" 
          id="avance"
          classBox=''
        />
        <Field 
          type="number" 
          label="Pendiente" 
          id="pendiente"
          classBox=''
        />
      </div>
      <TextArea
        label="Comentario"
        id="comment"
      />
    </div>
  )
}

export default Form