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
import { type TagsPaginatedSuccessResponse, type TagErrorResponse } from '../../index.types';

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
        const requestBody = {
          id: tagActive === null ? 0 : tagActive.id,
          name: tagActive === null ? name : formValues.name,
          style: tagActive === null ? '' : tagActive.style,
          total: tagActive === null ? 0 : tagActive?.total
        };

        const response =
          tagActive === null
            ? await savingTag(requestBody)
            : await updatingTag(requestBody);

        if (response.status === 'error') {
          const responseError = response as TagErrorResponse;
          // Errores de validación de campos por parte del backend
          Object.entries(responseError.details).forEach(([key, value]) => {
            addValidationError({ [key]: value });
          });

          // Mensaje de error general por parte del backend
          if (responseError.message !== '') {
            throw new Error(responseError.message);
          }
        } else {
          // const responseSuccess = response as TagSuccessResponse;
          reset();
          resetValidationError();
          const message =
            tagActive === null
              ? 'Se registró la etiqueta correctamente .'
              : 'Se actualizó la etiqueta';
          toastNotifications().toastSuccesCustomize(message);
          cleanSelectedTag();
          const tags = await getTags(searchParams.toString()) as TagsPaginatedSuccessResponse;
          setTags(tags);
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
