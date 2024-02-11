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
  validateDate
} from '../../utils/ProgressFormValidationInputs';
import { GLOBAL_UNIT_MEASURE_PROGRESS } from '#/config/globalConstantes';
import TimeInputSplitted from '../../../TimeInput';
import { type ProgressErrorResponse } from '../../indext.types';
import { convertHourToSeconds, processHours } from '#/utilities/timeHelpers';

// done: validateDoneAmount,
const validateFunctionsFormInputs = {
  date: validateDate,
  comment: validateComment,
  advanced: validateAdvancedAmount
};

interface Props {
  modalRef: any;
  recourseParent: Recourse;
  listUnitMeasure: Settings[];
  onFormSubmit: (pending: number) => void;
}

const ProgressForm: React.FC<Props> = ({
  modalRef,
  recourseParent,
  listUnitMeasure,
  onFormSubmit
}) => {
  const { addValidationError, progressError, resetValidationError, cleanSelectedProgress } =
    useProgress();
  const [disabledButton, setDisabledButton] = useState(false);
  const [isHoursUnitMeasure, setIsHoursUnitMeasure] = useState(false);

  useEffect(() => {
    const idUnitHoursMeasureProgress = listUnitMeasure.find(
      (val) => val.value === GLOBAL_UNIT_MEASURE_PROGRESS.UNIT_HOURS
    )?.id;
    setIsHoursUnitMeasure(recourseParent.unitMeasureProgressId === idUnitHoursMeasureProgress);
  }, []);

  useEffect(() => {
    reset();
  }, [isHoursUnitMeasure]);

  const initialState = {
    date: moment().format('YYYY-MM-DD'),
    advanced: (recourseParent.progress as Progress).advanced,
    comment: '',
    lastProgress: recourseParent.progress,
    isHoursUnitMeasure
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

        if (response.status === 'error') {
          const responseError = response as ProgressErrorResponse;
          // Errores de validación de campos por parte del backend
          Object.entries(responseError.details).forEach(([key, value]) => {
            addValidationError({ [key]: value });
          });

          // Mensaje de error general por parte del backend
          if (responseError.message !== '') {
            throw new Error(responseError.message);
          }
        } else {
          const lastProgress = recourseParent.progress as Progress;
          const pendingAmount = isHoursUnitMeasure
            ? convertHourToSeconds(processHours(lastProgress.total, advanced as string))
            : parseInt(lastProgress.total) - parseInt(advanced);
          reset();
          resetValidationError();
          cleanSelectedProgress();
          onFormSubmit(pendingAmount);
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
    return (recourseParent.progress as Progress).date ?? new Date().toISOString().split('T')[0];
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
        {isHoursUnitMeasure ? (
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
              isHoursUnitMeasure
                ? processHours((recourseParent.progress as Progress).total, advanced)
                : parseInt((recourseParent.progress as Progress).total) - parseInt(advanced)
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
              isHoursUnitMeasure
                ? processHours(advanced, (recourseParent.progress as Progress).advanced)
                : parseInt(advanced) - parseInt((recourseParent.progress as Progress).advanced)
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
