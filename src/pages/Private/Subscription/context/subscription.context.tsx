import { createContext, useContext, useReducer } from 'react';
import {
  type YoutubeSubscriptionProviderProps,
  initialState,
  type YoutubeSubscriptionsPaginatedSuccessResponse
} from '../index.types';
import { youtubeSubscriptionReducer } from './subscription.reducer';
import {
  ADD_VALIDATION_ERROR,
  CLEAN_SELECT_YOUTUBE_SUBSCRIPTION,
  RESET_VALIDATION_ERROR,
  SELECT_YOUTUBE_SUBSCRIPTION_ACTIVE,
  SET_YOUTUBE_SUBSCRIPTIONS_PER_PAGE,
  YOUTUBE_SUBSCRIPTION_LOADED
} from './types';

const YoutubeSubscriptionContext = createContext({});

// YOUTUBE SUBSCRIPTION  PROVIDER
export const SubscriptionYoutubeProvider = ({
  children
}: YoutubeSubscriptionProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(youtubeSubscriptionReducer, initialState);

  const addValidationError = (error: Record<string, string>): void => {
    dispatch({
      type: ADD_VALIDATION_ERROR,
      payload: error
    });
  };

  const resetValidationError = (): void => {
    dispatch({
      type: RESET_VALIDATION_ERROR,
      payload: true
    });
  };

  const setYoutubeSubscriptionPerPage = (perPage: number): void => {
    dispatch({
      type: SET_YOUTUBE_SUBSCRIPTIONS_PER_PAGE,
      payload: perPage
    });
  };

  const setYoutubeSubscriptions = (
    youtubeSubscriptions: YoutubeSubscriptionsPaginatedSuccessResponse
  ): void => {
    dispatch({
      type: YOUTUBE_SUBSCRIPTION_LOADED,
      payload: youtubeSubscriptions
    });
  };

  const selectedYoutubeSubscription = (youtubeSubscription: YoutubeSubscription): void => {
    dispatch({
      type: SELECT_YOUTUBE_SUBSCRIPTION_ACTIVE,
      payload: youtubeSubscription
    });
  };

  const cleanSelectedYoutubeSubscription = (): void => {
    dispatch({
      type: CLEAN_SELECT_YOUTUBE_SUBSCRIPTION,
      payload: true
    });
  };

  const youtubeSubscriptionActions = {
    youtubeSubscriptions: state.youtubeSubscriptions,
    youtubeSubscriptionMeta: state.youtubeSubscriptionMeta,
    youtubeSubscriptionError: state.validationError,
    youtubeSubscriptionPerPage: state.youtubeSubscriptionPerPage,
    youtubeSubscriptionActive: state.youtubeSubscriptionActive,
    setYoutubeSubscriptionPerPage,
    selectedYoutubeSubscription,
    addValidationError,
    setYoutubeSubscriptions,
    resetValidationError,
    cleanSelectedYoutubeSubscription
  };

  return (
    <YoutubeSubscriptionContext.Provider value={youtubeSubscriptionActions}>
      {children}
    </YoutubeSubscriptionContext.Provider>
  );
};

export const useYoutubeSubscription = (): Record<string, any> => {
  const context = useContext(YoutubeSubscriptionContext);
  if (context === undefined) {
    throw new Error('useYoutubeSubscription debe usarse junto a YoutubeSubscriptionContext');
  }
  return context;
};
