import React, { useEffect, useRef } from 'react';
import FormView from './FormView';
import { validateTagNombre } from '../../utils/TagFormValidationInputs';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/redux';
import { isLoading } from '@/redux/slice/uiSlice';
import { useForm } from '@/hooks/useForm';
import { useTag } from '../../context/tag.context';
import { focusInput } from '@/utilities/manipulationDom';

const validateFunctionsFormInputs = {
  name: validateTagNombre
};

const initialStateGlobal = {
  name: ''
};

export const FormContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tagError, addValidationError, cleanSelectedTag, resetValidationError, tagActive } =
    useTag();
  const initialState = tagActive !== null ? tagActive : initialStateGlobal;
  const [searchParams, setSearchParams] = useSearchParams();

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
    reset();
    console.log({ tagActive }, 'Se renderizo ');
  }, [tagErrorRef, tagActive]);

  const handleSubmit = async (): Promise<void> => {
    try {
      dispatch(isLoading(true));

      await validatedSubmitForm();
      // const isValid = Object.keys(tagError).every((el) => tagError[el] === null);

      // if (isValid) {
      //   const res = !tagActive
      //     ? await savingTag(formValues, searchParams)
      //     : await updatingTag(formValues);
      //   if (res) {
      //     reset();
      //     addNewError([]);
      //   }
      // }
    } catch (error) {
    } finally {
      dispatch(isLoading(false));
      focusInput('#name');
    }
  };
  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmit();
  };

  const handleCancelClick = (): void => {
    // selectedTag(null);
    // addNewError([]);
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
    />
  );
};
