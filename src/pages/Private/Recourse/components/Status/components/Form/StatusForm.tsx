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
import Button from '@/components/Button.js';

const validateInputs = {
  date: validateFecha,
  statusId: validateEstadoId,
  comment: validateComentario
};

interface Props {
  listStatus: Settings[];
  modalRef: any;
}
const StatusForm: React.FC<Props> = ({ listStatus, modalRef }) => {
  const [comboStatusData, setComboStatusData] = useState<Settings[]>([]);
  const initialState = {
    date: moment().format('YYYY-MM-DD'),
    statusId: 1,
    comment: ''
  };

  useEffect(() => {
    setComboStatusData(listStatus);
  }, [listStatus]);

  // const [formValues, handleInputChange, reset] = useForm(initialState, validateInputs, () => { });
  // const { fecha, estadoId } = formValues;
  // const statusErrorRef = useRef();

  // useEffect(()=>{
  //     statusErrorRef.current = recourseError;
  // }, [recourseError]);

  const handleChangesTemp = (): void => {
    console.log('change');
  };

  const handleClickCancel = (): void => {
    // console.log('cerrando');
    // console.log(modalRef);
    modalRef.close();
  };
  return (
    <div className="flex flex-col py-8 gap-10">
      <Field
        classBox=""
        label="Fecha"
        handleChange={handleChangesTemp}
        name="date"
        type="date"
        value="12"
        errorInput=""
      />
      <Combobox
        label="Estado"
        name="statusId"
        filter={false}
        options={comboStatusData}
        classBox=""
        handleChange={handleChangesTemp}
        value="231"
      />
      <TextArea label="Comentario" id="comment" />
      <div>
        <Button type="submit" text="Registrar" btnType="main" />

        <Button btnType="danger" text="Cancelar" type="button" handleClick={handleClickCancel} />
      </div>
    </div>
  );
};

export default StatusForm;
