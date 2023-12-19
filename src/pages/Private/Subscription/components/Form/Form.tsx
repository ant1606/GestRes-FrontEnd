import React, { useEffect, useState } from 'react';

import Field from '#/components/Field';
import Button from '#/components/Button';

import SelectorTag from '../SelectorTag/SelectorTag';

interface Props {
  modalRef: any;
  subscription: YoutubeSubscription;
  onFormSubmit: (pending: number) => void;
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
    // try {
    //   // TODO Ver como añadir un loader al modal
    //   await validatedSubmitForm();
    //   const existValidationMessage = Object.keys(progressErrorRef.current).every(
    //     (el) => progressErrorRef.current[el] === null
    //   );
    //   if (existValidationMessage) {
    //     const response = await savingProgress(
    //       {
    //         done: formValues.done,
    //         comment: formValues.comment,
    //         date: formValues.date
    //       },
    //       recourseParent.id
    //     );
    //     if ('data' in response) {
    //       const pendingAmount = recourseParent.progress.pending - done;
    //       // pendingAmount === 0
    //       //   ? toastNotifications().notificationSuccess(
    //       //     `Finalizó el recurso ${recourseParent.name}, Felicidades`
    //       //   )
    //       //   : toastNotifications().toastSucces();
    //       reset();
    //       resetValidationError();
    //       cleanSelectedProgress();
    //       onFormSubmit(pendingAmount);
    //     } else if ('error' in response) {
    //       const errorsDetail = response.error.detail;
    //       Object.keys(errorsDetail).forEach((key) => {
    //         if (key !== 'apiResponseMessageError') {
    //           addValidationError({ [key]: errorsDetail[key] });
    //         }
    //       });
    //       if ('apiResponseMessageError' in errorsDetail) {
    //         if (errorsDetail.apiResponseMessageError !== null)
    //           throw new Error(errorsDetail.apiResponseMessageError);
    //       }
    //     }
    //   }
    // } catch (error: any) {
    //   toastNotifications().notificationError(error.message);
    // } finally {
    //   // dispatch(isLoading(false));
    //   setDisabledButton(false);
    // }
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
              <p className="text-lg font-semibold ">{subscription.published_at}</p>
            </div>
          </div>
          <div className="w-36 h-36">
            <img
              src={subscription.thumbnail_default}
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
