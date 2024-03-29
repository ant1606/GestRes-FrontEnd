import React, { useEffect, useState } from 'react';
import Button from '#/components/Button';

import { updatingSubscription } from '#/services/subscriptions.services';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { type YoutubeSubscriptionErrorResponse } from '../../index.types';
import { type FetchWithSessionHandlingType } from '#/hooks/useFetch';
import SelectorTag from '#/components/SelectorTag/SelectorTag';
import { type TagsSelectorSuccessResponse } from '#/pages/Private/Tag/index.types';
import { getTagsForTagSelector } from '#/services';

interface Props {
  modalRef: any;
  subscription: YoutubeSubscription;
  onFormSubmit: () => void;
  fetchWithSessionHandling: FetchWithSessionHandlingType;
}

const Form: React.FC<Props> = ({
  modalRef,
  subscription,
  onFormSubmit,
  fetchWithSessionHandling
}) => {
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [disabledButton, setDisabledButton] = useState(false);
  const [choicesTagData, setChoicesTagData] = useState<Array<{ value: number; label: string }>>([]);

  const handleClickCancel = (): void => {
    modalRef.close();
  };

  useEffect(() => {
    const loadingTagsForSelector = async (): Promise<void> => {
      if (fetchWithSessionHandling !== undefined) {
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
    setSelectedTags(subscription.tags?.map((tag: Tag) => tag.id));
  }, [subscription]);

  const handleSubmit = async (): Promise<void> => {
    try {
      // TODO Ver como añadir un loader al modal
      setDisabledButton(true);
      const response = await updatingSubscription(
        subscription.id,
        selectedTags,
        fetchWithSessionHandling
      );

      if (response.status === 'error') {
        const responseError = response as YoutubeSubscriptionErrorResponse;
        // Mensaje de error general por parte del backend
        if (responseError.message !== '') {
          throw new Error(responseError.message);
        }
      } else {
        toastNotifications().toastSucces();
        onFormSubmit();
      }
    } catch (error: any) {
      toastNotifications().notificationError(error.message);
    } finally {
      setDisabledButton(false);
      // dispatch(isLoading(false));
    }
  };

  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={handleSubmitWrapper}>
      <div className="flex flex-col py-2 gap-6">
        <p className="text-2xl font-semibold text-gray-900">{subscription.title}</p>
        <div className="flex gap-2 justify-around">
          <div className="flex flex-col">
            <div className=" flex flex-col justify-center text-start h-full ">
              <p className="text-lg font-semibold text-gray-900">Fecha Subscripción:</p>
              <p className="text-lg font-semibold ">{subscription.publishedAt}</p>
            </div>
          </div>
          <div className="w-36 h-36">
            <img
              src={subscription.thumbnailDefault}
              alt={`${subscription.title} foto`}
              className="rounded-xl object-fill w-full h-full"
            />
          </div>
        </div>

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
