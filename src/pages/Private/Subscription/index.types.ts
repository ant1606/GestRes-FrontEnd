import { type ReactNode } from 'react';
import { type ApiResponseTag } from '../Tag/index.types';

/** CONTEXT Y REDUCER **/

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
    | YoutubeSubscriptionsPaginatedSuccessResponse;
}

export type typeValidationError = 'message';

export interface InitialState {
  youtubeSubscriptions: YoutubeSubscription[];
  youtubeSubscriptionActive: YoutubeSubscription | null;
  youtubeSubscriptionMeta: PaginateResultMeta | null;
  youtubeSubscriptionLinks: PaginateResultLinks | null;
  youtubeSubscriptionPerPage: number;
  validationError: Record<typeValidationError, string | null>;
  youtubeSubscriptionSearchLoading: boolean;
}

export const initialState: InitialState = {
  youtubeSubscriptions: [],
  youtubeSubscriptionActive: null,
  youtubeSubscriptionMeta: null,
  youtubeSubscriptionLinks: null,
  youtubeSubscriptionPerPage: 0,
  validationError: {
    message: null
  },
  youtubeSubscriptionSearchLoading: true
};

/** ADAPTERS **/
export interface YoutubeSubscriptionsPaginatedSuccessResponse {
  status: string;
  code: number;
  meta: PaginateResultMeta | null;
  data: YoutubeSubscription[];
  links: PaginateResultLinks | null;
}
export interface YoutubeSubscriptionsPaginatedErrorResponse {
  status: string;
  code: number;
  message: string;
  details: {
    searchTitle?: string;
    searchTags?: string;
  };
}

export interface YoutubeSubscriptionSuccessResponse {
  status: string;
  code: number;
  data: YoutubeSubscription;
}

export interface YoutubeSubscriptionErrorResponse {
  status: string;
  code: number;
  message: string;
  // details: YoutubeSubscriptionErrorDetailResponse;
}

export type YoutubeSubscriptionErrorDetailResponse = Record<string, string | null>;

export interface ApiResponseSuccessYoutubeSubscription {
  code: number;
  status: string;
  data: ApiResponseYoutubeSubscription;
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
