import { useEffect, useRef, useState } from 'react';
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
import { useForm } from '@/hooks/useForm.js';
import { useStatus } from '../../context/status.context.js';
import { savingStatus } from '@/services/status.services.js';
import { toastNotifications } from '@/utilities/notificationsSwal.js';

const validateFunctionsFormInputs = {
  date: validateFecha,
  statusId: validateEstadoId,
  comment: validateComentario
};

interface Props {
  listStatus: Settings[];
  recourseStatus: Settings[];
  modalRef: any;
  recourseParent: Recourse;
  onFormSubmit: (statusIdRegistered: number) => void;
}

const StatusForm: React.FC<Props> = ({
  listStatus,
  modalRef,
  recourseParent,
  onFormSubmit,
  recourseStatus
}) => {
  const { addValidationError, statusError, resetValidationError, cleanSelectedStatus } =
    useStatus();

  const [comboStatusData, setComboStatusData] = useState<Settings[]>([]);
  const initialState = {
    date: moment().format('YYYY-MM-DD'),
    statusId: listStatus[0].id,
    comment: '',
    lastStatusOfRecourse: recourseParent.status,
    recourseStatus
  };
  const {
    values: formValues,
    handleInputChange,
    validatedSubmitForm,
    reset
  } = useForm(
    initialState,
    validateFunctionsFormInputs as Record<string, (values: unknown) => string | null>,
    addValidationError
  );
  const { date, statusId, comment } = formValues;
  const statusErrorRef = useRef<Record<string, string | null>>({});
  useEffect(() => {
    setComboStatusData(listStatus);
  }, [listStatus]);
  useEffect(() => {
    statusErrorRef.current = statusError;
  }, [statusError]);

  useEffect(() => {
    addValidationError({ comment: null });
    // TODO Al momento de cambiar el tipoId, los valores cambiados de totalXXXXX no se reinicializan
  }, [statusId]);

  const handleClickCancel = (): void => {
    reset();
    modalRef.close();
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      // Ver como añadir un loader al modal
      await validatedSubmitForm();
      const existValidationMessage = Object.keys(statusErrorRef.current).every(
        (el) => statusErrorRef.current[el] === null
      );

      if (existValidationMessage) {
        const response = await savingStatus(
          {
            comment: formValues.comment,
            date: formValues.date,
            status_id: formValues.statusId
          },
          recourseParent.id
        );

        if ('data' in response) {
          reset();
          resetValidationError();
          cleanSelectedStatus();
          onFormSubmit(formValues.statusId);
        } else if ('error' in response) {
          const errorsDetail = response.error.detail;
          Object.keys(errorsDetail).forEach((key) => {
            if (key !== 'apiResponseMessageError') {
              addValidationError({ [key]: errorsDetail[key] });
            }
          });

          if ('apiResponseMessageError' in errorsDetail) {
            if (errorsDetail.apiResponseMessageError !== null)
              throw new Error(errorsDetail.apiResponseMessageError);
          }
        }
      }
    } catch (error: any) {
      toastNotifications().notificationError(error.message);
    } finally {
      // dispatch(isLoading(false));
    }
  };
  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmit();
  };

  const minDate = (): string => {
    return recourseParent.status.date ?? new Date().toISOString().split('T')[0];
  };

  return (
    <form onSubmit={handleSubmitWrapper}>
      <div className="flex flex-col py-8 gap-10">
        <Field
          classBox=""
          label="Fecha"
          handleChange={handleInputChange}
          name="date"
          type="date"
          value={date}
          errorInput={statusError.date}
          min={minDate()}
        />
        <Combobox
          label="Estado"
          name="statusId"
          filter={false}
          options={comboStatusData}
          classBox=""
          handleChange={handleInputChange}
          value={statusId}
          errorCombo={statusError.statusId}
        />
        <TextArea
          label="Comentario"
          name="comment"
          value={comment}
          handleChange={handleInputChange}
          classBox=""
          errorInput={statusError.comment}
          rows={3}
        />
        <div className="flex justify-around gap-12">
          <Button type="submit" text="Registrar" btnType="main" />

          <Button btnType="danger" text="Cancelar" type="button" handleClick={handleClickCancel} />
        </div>
      </div>
    </form>
  );
};

export default StatusForm;
