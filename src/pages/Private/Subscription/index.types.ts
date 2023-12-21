import { type ReactNode } from 'react';
import { type ApiResponseTag } from '../Tag/index.types';

export interface YoutubeSubscriptionsSuccessResponse {
  meta: PaginateResultMeta | null;
  data: YoutubeSubscription[];
  links: PaginateResultLinks | null;
}

export interface YoutubeSubscriptionErrorDetailResponse extends ApiErrorResponse {
  message: string;
  [key: string]: string | null;
}

export interface YoutubeSubscriptionErrorResponse {
  error: {
    status: string;
    detail: YoutubeSubscriptionErrorDetailResponse;
  };
}

export interface ApiResponseYoutubeSubscription {
  identificador: string;
  youtubeId: string;
  usuarioId: string;
  canalId: string;
  titulo: string;
  fechaSubscripcion: string;
  descripcion: string;
  fotoDefault: string;
  fotoMedium: string;
  fotoHigh: string;
  tags: ApiResponseTag[];
}

export interface YoutubeSubscriptionSuccessResponse {
  data: YoutubeSubscription;
}

// CONTEXT

export interface YoutubeSubscriptionProviderProps {
  children: ReactNode;
}
export interface ActionReducer {
  type: string;
  payload:
    | Record<string, unknown>
    | boolean
    | number
    | YoutubeSubscription
    | YoutubeSubscriptionsSuccessResponse;
}

export type typeValidationError = 'message';

export interface InitialState {
  youtubeSubscriptions: YoutubeSubscription[];
  youtubeSubscriptionActive: YoutubeSubscription | null;
  youtubeSubscriptionMeta: PaginateResultMeta | null;
  youtubeSubscriptionLinks: PaginateResultLinks | null;
  youtubeSubscriptionPerPage: number;
  validationError: Record<typeValidationError, string | null>;
}

export const initialState: InitialState = {
  youtubeSubscriptions: [],
  youtubeSubscriptionActive: null,
  youtubeSubscriptionMeta: null,
  youtubeSubscriptionLinks: null,
  youtubeSubscriptionPerPage: 0,
  validationError: {
    message: null
  }
};
