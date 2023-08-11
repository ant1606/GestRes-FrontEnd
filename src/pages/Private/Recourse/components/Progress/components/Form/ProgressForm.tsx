import React, { useEffect, useRef } from 'react';
import { useProgress } from '../../context/progress.context';
import { useForm } from '@/hooks/useForm';
import moment from 'moment';
import Field from '@/components/Field';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';
import { toastNotifications } from '@/utilities/notificationsSwal';
import { savingProgress } from '@/services/progress.services';
import {
  validateComment,
  validateDate,
  validateDoneAmount
} from '../../utils/ProgressFormValidationInputs';

const validateFunctionsFormInputs = {
  done: validateDoneAmount,
  date: validateDate,
  comment: validateComment
};

interface Props {
  modalRef: any;
  recourseParent: Recourse;
  onFormSubmit: () => void;
}

const ProgressForm: React.FC<Props> = ({ modalRef, recourseParent, onFormSubmit }) => {
  const {
    addValidationError,
    progressError,
    progressActive,
    resetValidationError,
    cleanSelectedProgress
  } = useProgress();

  const initialState = {
    done: 0,
    date: moment().format('YYYY-MM-DD'),
    comment: '',
    lastProgress: recourseParent.progress[recourseParent.progress.length - 1]
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
  const { done, date, comment } = formValues;
  const progressErrorRef = useRef<Record<string, string | null>>({});

  useEffect(() => {
    progressErrorRef.current = progressError;
  }, [progressError]);

  const handleClickCancel = (): void => {
    reset();
    modalRef.close();
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      // TODO Ver como añadir un loader al modal
      await validatedSubmitForm();
      const existValidationMessage = Object.keys(progressErrorRef.current).every(
        (el) => progressErrorRef.current[el] === null
      );

      if (existValidationMessage) {
        const response = await savingProgress(
          {
            done: formValues.done,
            pending: recourseParent.progress[recourseParent.progress.length - 1].pending - done,
            comment: formValues.comment,
            date: formValues.date
          },
          recourseParent.id
        );

        if ('data' in response) {
          const message =
            progressActive === null
              ? 'Se registró el progreso correctamente .'
              : 'Se actualizó el progreso';
          reset();
          resetValidationError();
          toastNotifications().toastSuccesCustomize(message);
          cleanSelectedProgress();
          onFormSubmit();
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
    return (
      recourseParent.progress[recourseParent.progress.length - 1].date ??
      new Date().toISOString().split('T')[0]
    );
  };
  return (
    <form onSubmit={handleSubmitWrapper}>
      <div className="flex flex-col py-8 gap-10">
        <Field
          type="date"
          label="Fecha"
          name="date"
          classBox=""
          value={date}
          errorInput={progressError.date}
          handleChange={handleInputChange}
          min={minDate()}
        />
        <div className="flex gap-10">
          <Field
            type="number"
            label="Avance"
            classBox=""
            errorInput={progressError.done}
            handleChange={handleInputChange}
            name="done"
            value={done}
          />
          <Field
            type="number"
            label="Pendiente"
            classBox=""
            errorInput={''}
            handleChange={(e) => {
              return null;
            }}
            name="pending"
            value={recourseParent.progress[recourseParent.progress.length - 1].pending - done}
            disabled
          />
        </div>
        <TextArea
          label="Comentario"
          classBox=""
          errorInput={progressError.comment}
          handleChange={handleInputChange}
          name="comment"
          value={comment}
        />
        <div>
          <Button type="submit" text="Registrar" btnType="main" />

          <Button btnType="danger" text="Cancelar" type="button" handleClick={handleClickCancel} />
        </div>
      </div>
    </form>
  );
};

export default ProgressForm;
