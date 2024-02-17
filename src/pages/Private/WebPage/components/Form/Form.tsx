import React, { useEffect, useRef, useState } from 'react';
import Button from '#/components/Button';

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
import { savingWebPage, updatingWebPage } from '#/services/webPage.services';
import { type WebPageErrorResponse } from '../../index.types';
import { type FetchWithSessionHandlingType } from '#/hooks/useFetch';
import SelectorTag from '#/components/SelectorTag/SelectorTag';
import { getTagsForTagSelector } from '#/services';
import { type TagsSelectorSuccessResponse } from '#/pages/Private/Tag/index.types';

interface Props {
  modalRef: any;
  onFormSubmit: () => void;
  fetchWithSessionHandling: FetchWithSessionHandlingType;
  webPage?: WebPage;
}

const validateFunctionsFormInputs = {
  url: validateUrl,
  name: validateName,
  description: validateDescription
};

const Form: React.FC<Props> = ({
  modalRef,
  onFormSubmit,
  fetchWithSessionHandling,
  webPage = null
}) => {
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [disabledButton, setDisabledButton] = useState(false);
  const [choicesTagData, setChoicesTagData] = useState<Array<{ value: number; label: string }>>([]);
  const { addValidationError, webPageError, resetValidationError } = useWebPage();

  const initialState = {
    url: webPage?.url ?? '',
    name: webPage?.name ?? '',
    description: webPage?.description ?? ''
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
    return () => {
      resetValidationError();
    };
  }, [resetValidationError]);

  useEffect(() => {
    const loadingTagsForSelector = async (): Promise<void> => {
      if (fetchWithSessionHandling !== undefined) {
        console.log(selectedTags);
        const response = (await getTagsForTagSelector(
          fetchWithSessionHandling
        )) as TagsSelectorSuccessResponse;
        const dataTag = response.data.map((tag: Tag) => ({
          value: tag.id,
          label: tag.name,
          selected: false
        }));
        setChoicesTagData(dataTag);
      }
    };
    loadingTagsForSelector();
  }, [fetchWithSessionHandling]);

  useEffect(() => {
    if (webPage !== null && webPage !== undefined) {
      setSelectedTags(webPage.tags?.map((tag: Tag) => tag.id));
    }
  }, [webPage]);

  useEffect(() => {
    webPageErrorRef.current = webPageError;
  }, [webPageError]);

  const handleSubmit = async (): Promise<void> => {
    try {
      // TODO Ver como añadir un loader al modal
      setDisabledButton(true);
      await validatedSubmitForm();
      const existValidationMessage = Object.keys(webPageErrorRef.current).every(
        (el) => webPageErrorRef.current[el] === null
      );

      if (existValidationMessage) {
        const requestBody = {
          id: 0,
          url: formValues.url,
          name: formValues.name,
          description: formValues.description,
          count_visits: 0,
          tags: selectedTags ?? []
        };
        let response;

        if (webPage === null) {
          response = await savingWebPage(requestBody, fetchWithSessionHandling);
        } else {
          let resultDialog = true;
          resultDialog = await toastNotifications().modalCustomDialogQuestion(
            `Actualización de Página Web`,
            '¿Desea continuar con la actualización?'
          );

          if (!resultDialog) throw new Error('Se cancelo la actualización');
          response = await updatingWebPage(
            { ...requestBody, id: webPage?.id },
            fetchWithSessionHandling
          );
        }

        if (response.status === 'error') {
          const responseError = response as WebPageErrorResponse;

          // Errores de validación de campos por parte del backend
          Object.entries(responseError.details).forEach(([key, value]) => {
            addValidationError({ [key]: value });
          });

          // Mensaje de error general por parte del backend
          if (responseError.message !== '') {
            throw new Error(responseError.message);
          }
        } else {
          onFormSubmit();
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

        <SelectorTag
          setSelectValues={setSelectedTags}
          selectedTags={selectedTags}
          choicesData={choicesTagData}
        />
        <div className="flex justify-around gap-12">
          <Button type="submit" text="Registrar" btnType="main" isDisabled={disabledButton} />

          <Button btnType="danger" text="Cancelar" type="button" onClick={handleClickCancel} />
        </div>
      </div>
    </form>
  );
};

export default Form;
