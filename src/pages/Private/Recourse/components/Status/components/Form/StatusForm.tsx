import { useEffect, useState } from 'react';
import moment from 'moment';
import {
  validateFecha,
  validateComentario,
  validateEstadoId
} from '../../utils/StatusFormValidationInputs.js';
import Field from '@/components/Field.js';
import Combobox from '@/components/Combobox.js';
import TextArea from '@/components/TextArea.js';

const validateInputs = {
  fecha: validateFecha,
  estadoId: validateEstadoId,
  comentario: validateComentario
};

interface Props {
  listStatus: Settings[];
}
const StatusForm: React.FC<Props> = ({ listStatus }) => {
  const [comboStatusData, setComboStatusData] = useState<Settings[]>([]);
  // No se detectaba el estado de settingStatus en el form, quizas porque esta incrustado en SweetAlert, investigar luego
  // const { settingsStatus } = useSettings();

  const initialState = {
    fecha: moment().format('YYYY-MM-DD'),
    estadoId: 1,
    comentario: ''
  };

  // const [formValues, handleInputChange, reset] = useForm(initialState, validateInputs, () => { });
  // const { fecha, estadoId } = formValues;
  // const statusErrorRef = useRef();

  useEffect(() => {
    // console.log(fecha);
    // console.log(settingsStatus);
    // if (statusOptions !== null) {
    setComboStatusData(listStatus);
    // reset();
    // }
  }, [listStatus]);

  // useEffect(()=>{
  //     statusErrorRef.current = recourseError;
  // }, [recourseError]);

  const handleChangesTemp = (): void => {
    console.log('change');
  };
  return (
    <div className="flex flex-col py-8 gap-10">
      <Field
        classBox=""
        label="Fecha"
        handleChange={handleChangesTemp}
        name="fecha"
        type="date"
        value="12"
        errorInput=""
      />
      <Combobox
        label="Estado"
        name="estadoId"
        filter={false}
        options={comboStatusData}
        classBox=""
        handleChange={handleChangesTemp}
        value="231"
      />
      <TextArea label="Comentario" id="comment" />
    </div>
  );
};

export default StatusForm;
