/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import FormView from './FormView';
import { validateTagNombre } from '../../utils/TagFormValidationInputs';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '#/hooks/redux';
import { isLoading } from '#/redux/slice/uiSlice';
import { useForm } from '#/hooks/useForm';
import { useTag } from '../../context/tag.context';
import { focusInput } from '#/utilities/manipulationDom';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { getTags, savingTag, updatingTag } from '#/services/tag.services';

const validateFunctionsFormInputs = {
  name: validateTagNombre
};

const initialStateGlobal = {
  name: ''
};

export const FormContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    tagError,
    addValidationError,
    cleanSelectedTag,
    resetValidationError,
    tagActive,
    setTags
  } = useTag();
  const initialState = tagActive !== null ? tagActive : initialStateGlobal;
  const [searchParams] = useSearchParams();
  const [disabledButton, setDisabledButton] = useState(false);

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
  const { name } = formValues;
  const tagErrorRef = useRef<Record<string, string | null>>({});

  useEffect(() => {
    tagErrorRef.current = tagError;
  }, [tagError]);

  useEffect(() => {
    reset();
  }, [tagActive]);

  const handleSubmit = async (): Promise<void> => {
    try {
      dispatch(isLoading(true));
      setDisabledButton(true);
      await validatedSubmitForm();
      const existValidationMessage = Object.keys(tagErrorRef.current).every(
        (el) => tagErrorRef.current[el] === null
      );
      if (existValidationMessage) {
        const response =
          tagActive === null
            ? await savingTag({ id: 0, name, style: '' })
            : await updatingTag({
              id: tagActive.id,
              name: formValues.name,
              style: tagActive.style
            });
        if ('data' in response) {
          reset();
          resetValidationError();
          const message =
            tagActive === null
              ? 'Se registró la etiqueta correctamente .'
              : 'Se actualizó la etiqueta';
          toastNotifications().toastSuccesCustomize(message);
          cleanSelectedTag();
          const tags = await getTags(searchParams.toString());
          setTags(tags);
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
      setDisabledButton(false);
      dispatch(isLoading(false));
      focusInput('#name');
    }
  };

  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmit();
  };

  const handleCancelClick = (): void => {
    cleanSelectedTag();
    resetValidationError();
    focusInput('#name');
  };

  return (
    <FormView
      handleCancelClick={handleCancelClick}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmitWrapper}
      name={name}
      tagError={tagError}
      submitIsDisabled={disabledButton}
    />
  );
};
