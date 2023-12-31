import { type ReactNode } from 'react';
import { type ApiResponseTag } from '../Tag/index.types';

export interface WebPagesSuccessResponse {
  meta: PaginateResultMeta | null;
  data: WebPage[];
  links: PaginateResultLinks | null;
}

export interface WebPageSuccessResponse {
  data: WebPage;
}

export interface WebPageErrorResponse {
  error: {
    status: string;
    detail: WebPageErrorDetailResponse;
  };
}

// Detalles de error de Validación
export interface WebPageErrorDetailResponse extends ApiErrorResponse {
  name: string | null;
  url: string | null;
  description: string | null;
  [key: string]: string | null;
}

export interface WebPageFormData {
  name: string;
  url: string;
  description: number;
}

/** CONTEXT Y REDUCER */
export interface WebPageProviderProps {
  children: ReactNode;
}

export type payloadReducerType =
  | Record<string, unknown>
  | boolean
  | number
  | WebPage
  | WebPage[]
  | WebPageSuccessResponse
  | WebPagesSuccessResponse;

export interface ActionReducer {
  type: string;
  payload: payloadReducerType;
}

export type typeValidationError = 'url' | 'name' | 'description';

export interface InitialState {
  webPages: WebPage[];
  webPageActive: WebPage | null;
  webPageMeta: PaginateResultMeta | null;
  webPageLinks: PaginateResultLinks | null;
  webPagePerPage: number;
  validationError: Record<typeValidationError, string | null>;
}

/** ADAPTERS */

export interface ApiResponseWebPage {
  identificador: number;
  url: string;
  nombre: string;
  descripcion: string;
  totalVisitas: number;
  tags: ApiResponseTag[];
}
