import React, { useEffect, useState } from 'react';
import Button from '#/components/Button';
import SelectorTag from '../SelectorTag/SelectorTag';
import { updatingSubscription } from '#/services/subscriptions.services';
import { toastNotifications } from '#/utilities/notificationsSwal';

interface Props {
  modalRef: any;
  subscription: YoutubeSubscription;
  onFormSubmit: () => void;
}

const Form: React.FC<Props> = ({ modalRef, subscription, onFormSubmit }) => {
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  useEffect(() => {
    setSelectedTags(subscription.tags?.map((tag: Tag) => tag.id));
  }, [subscription]);

  const handleClickCancel = (): void => {
    modalRef.close();
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      // TODO Ver como añadir un loader al modal
      const response = await updatingSubscription({
        tags: selectedTags,
        id: subscription.id
      });
      console.log(response);
      if ('data' in response) {
        toastNotifications().toastSucces();
        onFormSubmit();
      } else if ('error' in response) {
        const errorsDetail = response.error.detail;
        if ('apiResponseMessageError' in errorsDetail) {
          if (errorsDetail.apiResponseMessageError !== null)
            throw new Error(errorsDetail.apiResponseMessageError);
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

        <SelectorTag setSelectValues={setSelectedTags} selectedTags={selectedTags} />
        <div className="flex justify-around gap-12">
          <Button type="submit" text="Registrar" btnType="main" />

          <Button btnType="danger" text="Cancelar" type="button" onClick={handleClickCancel} />
        </div>
      </div>
    </form>
  );
};

export default Form;
