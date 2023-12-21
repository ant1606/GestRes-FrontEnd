import { type Reducer } from 'react';
import {
  type YoutubeSubscriptionsSuccessResponse,
  type ActionReducer,
  type InitialState
} from '../index.types';
import {
  SET_YOUTUBE_SUBSCRIPTIONS_PER_PAGE,
  YOUTUBE_SUBSCRIPTION_LOADED,
  SELECT_YOUTUBE_SUBSCRIPTION_ACTIVE,
  ADD_VALIDATION_ERROR,
  RESET_VALIDATION_ERROR,
  CLEAN_SELECT_YOUTUBE_SUBSCRIPTION
} from './types';

export const youtubeSubscriptionReducer: Reducer<InitialState, ActionReducer> = (
  state: InitialState,
  action: ActionReducer
): InitialState => {
  let payloadKey = '';
  let payloadValue;
  switch (action.type) {
    case YOUTUBE_SUBSCRIPTION_LOADED:
      payloadValue = action.payload as YoutubeSubscriptionsSuccessResponse;
      return {
        ...state,
        youtubeSubscriptions: [...payloadValue.data],
        youtubeSubscriptionMeta: payloadValue.meta,
        youtubeSubscriptionLinks: payloadValue.links
      };
    case SET_YOUTUBE_SUBSCRIPTIONS_PER_PAGE:
      payloadValue = action.payload;
      if (typeof payloadValue !== 'number') {
        throw new Error('El valor a enviar en SET_TAGS_PER_PAGE debe ser un numero');
      }
      return {
        ...state,
        youtubeSubscriptionPerPage: payloadValue
      };
    case SELECT_YOUTUBE_SUBSCRIPTION_ACTIVE:
      return {
        ...state,
        youtubeSubscriptionActive: action.payload as YoutubeSubscription
      };
    case ADD_VALIDATION_ERROR:
      payloadKey = Object.getOwnPropertyNames(action.payload)[0];
      payloadValue = Object.values(action.payload)[0];
      return {
        ...state,
        validationError: {
          ...state.validationError,
          [payloadKey]: payloadValue as string | null
        }
      };
    case RESET_VALIDATION_ERROR:
      return {
        ...state,
        validationError: {
          message: null
        }
      };
    case CLEAN_SELECT_YOUTUBE_SUBSCRIPTION:
      return {
        ...state,
        youtubeSubscriptionActive: null
      };
  }
  throw new Error(`Action desconocida del tipo ${action.type}`);
};
