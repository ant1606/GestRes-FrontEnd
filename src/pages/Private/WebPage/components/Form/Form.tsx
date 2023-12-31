import React, { useEffect, useRef, useState } from 'react';
import Button from '#/components/Button';
import SelectorTag from '../SelectorTag/SelectorTag';
import { toastNotifications } from '#/utilities/notificationsSwal';
import Field from '#/components/Field';
import TextArea from '#/components/TextArea';
import { useForm } from '#/hooks/useForm';
import {
  validateDescription,
  validateName,
  validateUrl
} from '../../utils/WebPageFormValidationInputs';
import { useWebPage } from '../../context/webPage.context';
import { savingWebPage } from '#/services/webPage.services';

interface Props {
  modalRef: any;
  onFormSubmit: () => void;
}

const validateFunctionsFormInputs = {
  url: validateUrl,
  name: validateName,
  description: validateDescription
};

const Form: React.FC<Props> = ({ modalRef, onFormSubmit }) => {
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [disabledButton, setDisabledButton] = useState(false);
  const {
    addValidationError,
    webPageActive,
    webPageError,
    resetValidationError,
    cleanSelectedWebPage
  } = useWebPage();

  const initialState = {
    url: webPageActive?.url ?? '',
    name: webPageActive?.name ?? '',
    description: webPageActive?.description ?? ''
  };

  const {
    values: formValues,
    handleInputChange,
    validatedSubmitForm
  } = useForm(
    initialState,
    validateFunctionsFormInputs as Record<string, (values: unknown) => string | null>,
    addValidationError
  );

  const { url, name, description } = formValues;
  const webPageErrorRef = useRef<Record<string, string | null>>({});

  useEffect(() => {
    if (webPageActive !== null) {
      setSelectedTags(webPageActive.tags?.map((tag: Tag) => tag.id));
    }
  }, [webPageActive]);

  useEffect(() => {
    webPageErrorRef.current = webPageError;
  }, [webPageError]);

  useEffect(() => {
    return () => {
      resetValidationError();
    };
  }, []);

  const handleSubmit = async (): Promise<void> => {
    try {
      // TODO Ver como añadir un loader al modal
      setDisabledButton(true);
      await validatedSubmitForm();
      const existValidationMessage = Object.keys(webPageErrorRef.current).every(
        (el) => webPageErrorRef.current[el] === null
      );

      if (existValidationMessage) {
        const webPageToSend = {
          url: formValues.url,
          name: formValues.name,
          description: formValues.description,
          count_visits: 0,
          tags: selectedTags ?? []
        };
        const response = await savingWebPage(webPageToSend);
        if ('data' in response) {
          cleanSelectedWebPage();
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
      setDisabledButton(false);
    }
  };

  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmit();
  };

  const handleClickCancel = (): void => {
    modalRef.close();
  };

  return (
    <form onSubmit={handleSubmitWrapper}>
      <div className="flex flex-col py-4 gap-10">
        <Field
          type="text"
          label="URL/Link"
          name="url"
          classBox=""
          value={url}
          errorInput={webPageError.url}
          handleChange={handleInputChange}
        />
        <Field
          type="text"
          label="nombre"
          name="name"
          classBox=""
          value={name}
          errorInput={webPageError.name}
          handleChange={handleInputChange}
        />
        <TextArea
          label="Descripción"
          classBox=""
          errorInput={webPageError.description}
          handleChange={handleInputChange}
          name="description"
          value={description}
        />

        <SelectorTag setSelectValues={setSelectedTags} selectedTags={selectedTags} />
        <div className="flex justify-around gap-12">
          <Button type="submit" text="Registrar" btnType="main" isDisabled={disabledButton} />

          <Button btnType="danger" text="Cancelar" type="button" onClick={handleClickCancel} />
        </div>
      </div>
    </form>
  );
};

export default Form;
