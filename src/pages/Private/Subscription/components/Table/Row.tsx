import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { toastNotifications } from '#/utilities/notificationsSwal';
import { useAppDispatch } from '#/hooks/redux';
import { isLoading } from '#/redux/slice/uiSlice';
import { focusInput } from '#/utilities/manipulationDom';
import { destroyTag, getTags } from '#/services/tag.services';
import { IconContext } from 'react-icons';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { useYoutubeSubscription } from '../../context/subscription.context';

interface Prop {
  youtubeSubscription: YoutubeSubscription;
}
const Row: React.FC<Prop> = ({ youtubeSubscription }) => {
  // const { selectedTag, resetValidationError, cleanSelectedTag, setTags, addValidationError } =
  //   useYoutubeSubscription();

  // const [searchParams] = useSearchParams();
  // const dispatch = useAppDispatch();

  // const handleClickEdit = (tag: Tag): void => {
  //   resetValidationError();
  //   selectedTag(tag);
  //   focusInput('#name');
  // };

  // const handleClickDelete = async (tag: Tag): Promise<void> => {
  //   try {
  //     const result = await toastNotifications().modalDeleteConfirm(tag.name);
  //     if (!result) return;

  //     dispatch(isLoading(true));
  //     const response = await destroyTag(tag);
  //     if ('data' in response) {
  //       resetValidationError();
  //       toastNotifications().toastSuccesCustomize(
  //         `Se elimino la etiqueta ${tag.name} satisfactoriamente`
  //       );
  //       cleanSelectedTag();
  //       const tags = await getTags(searchParams.toString());
  //       setTags(tags);
  //     } else if ('error' in response) {
  //       const errorsDetail = response.error?.detail;
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
  //   } catch (error: any) {
  //     toastNotifications().notificationError(error.message);
  //   } finally {
  //     dispatch(isLoading(false));
  //   }
  // };

  return (
    <tr>
      <td className="w-48 h-14">
        <div className="flex justify-around items-center px-3 py-2">
          <button
            className="w-8 h-8  flex justify-center items-center bg-yellow-400 rounded-lg"
            onClick={() => {
              // handleClickEdit(tag);
            }}>
            <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
              <FaPencilAlt />
            </IconContext.Provider>
          </button>
          <button
            className="w-8 h-8  flex justify-center items-center bg-red-600 rounded-lg"
            onClick={() => {
              // handleClickDelete(tag);
            }}>
            <IconContext.Provider value={{ size: '1.25em', color: 'white' }}>
              <FaTrashAlt />
            </IconContext.Provider>
          </button>
        </div>
      </td>
      <td className="max-h-14 max-w-xs">
        <div className="flex justify-center items-center">
          <a
            href={`https://www.youtube.com/channel/${youtubeSubscription.channel_id}`}
            target="_blank"
            rel="noreferrer">
            <img
              src={youtubeSubscription.thumbnail_default}
              alt={`${youtubeSubscription.title} foto`}
            />
          </a>
        </div>
      </td>
      <td className="max-h-14 max-w-xs">
        <div className="px-3 text-center text-lg text-gray-900 font-semibold">
          <p>{youtubeSubscription.title}</p>
        </div>
      </td>
      <td className="max-h-14 max-w-xs">
        <div className="px-3 text-center text-lg text-gray-900 font-semibold">
          <p>{youtubeSubscription.published_at}</p>
        </div>
      </td>
      {/* <td className="max-h-14 max-w-xs">
        <div className="px-3 text-center text-lg text-gray-900 font-semibold">
          <p>{youtubeSubscription.description}</p>
        </div>
      </td> */}
    </tr>
  );
};

export default Row;
