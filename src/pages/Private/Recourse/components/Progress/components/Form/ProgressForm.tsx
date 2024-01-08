import React, { useEffect, useRef, useState } from 'react';
import { useProgress } from '../../context/progress.context';
import { useForm } from '#/hooks/useForm';
import moment from 'moment';
import Field from '#/components/Field';
import TextArea from '#/components/TextArea';
import Button from '#/components/Button';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { savingProgress } from '#/services/progress.services';
import {
  validateAdvancedAmount,
  validateComment,
  validateDate,
  validateDoneAmount
} from '../../utils/ProgressFormValidationInputs';
import { GLOBAL_TYPES_RECOURSE } from '#/config/globalConstantes';
import TimeInputSplitted from '../../../TimeInput';

// done: validateDoneAmount,
const validateFunctionsFormInputs = {
  date: validateDate,
  comment: validateComment,
  advanced: validateAdvancedAmount
};

interface Props {
  modalRef: any;
  recourseParent: Recourse;
  listTypes: Settings[];
  onFormSubmit: (pending: number) => void;
}

const ProgressForm: React.FC<Props> = ({ modalRef, recourseParent, listTypes, onFormSubmit }) => {
  const { addValidationError, progressError, resetValidationError, cleanSelectedProgress } =
    useProgress();
  const [disabledButton, setDisabledButton] = useState(false);
  const [isTypeVideo, setIsTypeVideo] = useState(false);

  useEffect(() => {
    setIsTypeVideo(
      parseInt(recourseParent.typeId) ===
      listTypes.find((val) => val.key === GLOBAL_TYPES_RECOURSE.RECOURSE_TYPE_VIDEO)?.id
    );
  }, []);

  useEffect(() => {
    reset();
  }, [isTypeVideo]);

  const initialState = {
    date: moment().format('YYYY-MM-DD'),
    advanced: recourseParent.progress.advanced,
    comment: '',
    lastProgress: recourseParent.progress,
    isTypeVideo
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
  const { date, comment, advanced } = formValues;
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
      setDisabledButton(true);
      await validatedSubmitForm();
      const existValidationMessage = Object.keys(progressErrorRef.current).every(
        (el) => progressErrorRef.current[el] === null
      );

      if (existValidationMessage) {
        const response = await savingProgress(
          {
            advanced: formValues.advanced,
            done: formValues.done,
            comment: formValues.comment,
            date: formValues.date
          },
          recourseParent.id
        );

        if ('data' in response) {
          const pendingAmount = recourseParent.progress.total - advanced;
          // pendingAmount === 0
          //   ? toastNotifications().notificationSuccess(
          //     `Finalizó el recurso ${recourseParent.name}, Felicidades`
          //   )
          //   : toastNotifications().toastSucces();
          reset();
          resetValidationError();

          cleanSelectedProgress();

          onFormSubmit(pendingAmount);
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
      setDisabledButton(false);
    }
  };
  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmit();
  };

  const minDate = (): string => {
    return recourseParent.progress.date ?? new Date().toISOString().split('T')[0];
  };

  // TODO EXtraer esta lógica
  const processHours = (hora1, hora2, isSubtract = true) => {
    // console.log('desde processHours', hora1, hora2);
    const [horas1, minutos1, segundos1] = hora1.split(':').map(Number);
    const [horas2, minutos2, segundos2] = hora2.split(':').map(Number);

    const totalSegundos1 = horas1 * 3600 + minutos1 * 60 + segundos1;
    const totalSegundos2 = horas2 * 3600 + minutos2 * 60 + segundos2;

    const totalSegundos = isSubtract
      ? totalSegundos1 - totalSegundos2
      : totalSegundos1 + totalSegundos2;

    const nuevasHoras = Math.floor(totalSegundos / 3600);
    const nuevosMinutos = Math.floor((totalSegundos % 3600) / 60);
    const nuevosSegundos = totalSegundos % 60;

    return `${String(abs(nuevasHoras)).padStart(2, '0')}:${String(abs(nuevosMinutos)).padStart(
      2,
      '0'
    )}:${String(abs(nuevosSegundos)).padStart(2, '0')}`;
  };

  // Función auxiliar para obtener el valor absoluto
  const abs = (value) => {
    return value < 0 ? -value : value;
  };

  return (
    <form onSubmit={handleSubmitWrapper}>
      <div className="flex flex-col py-8 gap-12">
        {/* <div className="flex gap-10"> */}
        <Field
          type="date"
          label="Fecha"
          name="date"
          classBox="basis-full"
          value={date}
          errorInput={progressError.date}
          handleChange={handleInputChange}
          min={minDate()}
        />
        {isTypeVideo ? (
          <TimeInputSplitted
            handleChange={handleInputChange}
            timeValue={advanced}
            name="advanced"
            outInputFocus="comment"
            label="Avanzado hasta"
            classBox="basis-full"
            errorInput={progressError.advanced}
          />
        ) : (
          <Field
            type="text"
            label="Avance hasta"
            classBox="basis-full"
            errorInput={progressError.advanced}
            handleChange={handleInputChange}
            name="advanced"
            value={advanced}
          />
        )}
        {/* </div> */}
        <div className="flex gap-10">
          <Field
            type="text"
            label="Pendiente"
            classBox=""
            errorInput={''}
            handleChange={(e) => {
              return null;
            }}
            name="pending"
            value={
              isTypeVideo
                ? processHours(recourseParent.progress.total, advanced)
                : recourseParent.progress.total - advanced
            }
            disabled
          />
          <Field
            type="text"
            label="Realizado"
            classBox=""
            errorInput={''}
            handleChange={(e) => {
              return null;
            }}
            name="pending"
            value={
              isTypeVideo
                ? processHours(advanced, recourseParent.progress.advanced)
                : advanced - recourseParent.progress.advanced
            }
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
        <div className="flex justify-around gap-12">
          <Button type="submit" text="Registrar" btnType="main" isDisabled={disabledButton} />

          <Button btnType="danger" text="Cancelar" type="button" onClick={handleClickCancel} />
        </div>
      </div>
    </form>
  );
};

export default ProgressForm;
