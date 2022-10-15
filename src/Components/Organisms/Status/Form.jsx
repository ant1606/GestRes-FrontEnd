
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
      <Combobox 
        label="Estado"
        name="status" 
        options={['Uno', 'Dos']} 
        classBox=''
      />
      <TextArea
        label="Comentario"
        id="comment"
      />
    </div>
  )
}

export default Form