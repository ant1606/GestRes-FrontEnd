
import Field from '../../Atoms/Field'
import Combobox from '../../Atoms/Combobox'
import TextArea from '../../Atoms/TextArea'
import useSettings from "../../../Context/SettingsContext.jsx";
import {useEffect,  useState} from "react";
import moment from 'moment';
import {useForm} from "../../../hooks/useForm.js";
import {validateFecha, validateComentario, validateEstadoId} from "./StatusFormValidationInputs.js";

const StatusForm = () => {
    const { settingsStatus } = useSettings();
    const [comboStatusData, setComboStatusData] = useState([]);

    const initialState = {
        fecha: moment().format("YYYY-MM-DD"),
        estadoId: 1,
        comentario:''
    };

    const validateInputs = {
        fecha: validateFecha,
        estadoId: validateEstadoId,
        comentario: validateComentario
    }
    const [formValues, handleInputChange, reset ] = useForm(initialState, validateInputs, ()=>{} );
    const {fecha, estadoId} = formValues;
    // const statusErrorRef = useRef();

    useEffect(()=> {
        console.log(fecha);
        if(settingsStatus !== null){
            setComboStatusData(settingsStatus);
            reset()
        }
    }, [settingsStatus]);

    // useEffect(()=>{
    //     statusErrorRef.current = recourseError;
    // }, [recourseError]);

  return (
    <div className='flex flex-col py-8 gap-10'>
      <Field
          classBox=''
          id="fecha"
          label="Fecha"
          handleChange={handleInputChange}
          name="fecha"
          type="date"
          value={fecha}
      />
      <Combobox 
        label="Estado"
        name="estadoId"
        filter={false}
        options={comboStatusData}
        classBox=''
        handleChange={handleInputChange}
        value={estadoId}
      />
      <TextArea
        label="Comentario"
        id="comment"
      />
    </div>
  )
}

export default StatusForm