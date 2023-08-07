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
  modalRef: any;
  recourseParent: Recourse;
}

const StatusForm: React.FC<Props> = ({ listStatus, modalRef, recourseParent }) => {
  const {
    addValidationError,
    statusError,
    statusActive,
    resetValidationError,
    cleanSelectedStatus
  } = useStatus();

  const [comboStatusData, setComboStatusData] = useState<Settings[]>([]);
  const initialState = {
    date: moment().format('YYYY-MM-DD'),
    statusId: 1,
    comment: ''
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
        // const response =
        //   statusActive === null ? await savingStatus(formValues) : await updatingTag(formValues);

        if ('data' in response) {
          const message =
            statusActive === null
              ? 'Se registró el estado correctamente .'
              : 'Se actualizó el estado';
          reset();
          resetValidationError();
          toastNotifications().toastSuccesCustomize(message);
          cleanSelectedStatus();
          modalRef.close();
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
        />
        <div>
          <Button type="submit" text="Registrar" btnType="main" />

          <Button btnType="danger" text="Cancelar" type="button" handleClick={handleClickCancel} />
        </div>
      </div>
    </form>
  );
};

export default StatusForm;
