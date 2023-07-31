import Field from '../../Atoms/Field.js';
import Combobox from '../../Atoms/Combobox.js';
import TextArea from '../../Atoms/TextArea.js';
import useSettings from '../../../Context/SettingsContext.jsx';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useForm } from '../../../hooks/useForm.js';
import {
  validateFecha,
  validateComentario,
  validateEstadoId
} from '../../utils/StatusFormValidationInputs.js';

const StatusForm = ({ statusOptions }) => {
  const [comboStatusData, setComboStatusData] = useState([]);
  // No se detectaba el estado de settingStatus en el form, quizas porque esta incrustado en SweetAlert, investigar luego
  // const { settingsStatus } = useSettings();

  const initialState = {
    fecha: moment().format('YYYY-MM-DD'),
    estadoId: 1,
    comentario: ''
  };

  const validateInputs = {
    fecha: validateFecha,
    estadoId: validateEstadoId,
    comentario: validateComentario
  };
  const [formValues, handleInputChange, reset] = useForm(initialState, validateInputs, () => { });
  const { fecha, estadoId } = formValues;
  // const statusErrorRef = useRef();

  useEffect(() => {
    // console.log(fecha);
    // console.log(settingsStatus);
    if (statusOptions !== null) {
      setComboStatusData(statusOptions);
      reset();
    }
  }, [statusOptions]);

  // useEffect(()=>{
  //     statusErrorRef.current = recourseError;
  // }, [recourseError]);
  return (
    <div className="flex flex-col py-8 gap-10">
      <Field
        classBox=""
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
        classBox=""
        handleChange={handleInputChange}
        value={estadoId}
      />
      <TextArea label="Comentario" id="comment" />
    </div>
  );
};

export default StatusForm;
