import { type ReactNode } from 'react';
import { type ApiResponseTag } from '../Tag/index.types';

export interface WebPagesPaginatedSuccessResponse {
  status: string;
  code: number;
  meta: PaginateResultMeta | null;
  data: WebPage[];
  links: PaginateResultLinks | null;
}

export interface WebPagePaginatedErrorResponse {
  status: string;
  code: number;
  message: string;
  details: {
    searchNombre?: string;
    searchTags?: string;
  };
}

export interface WebPageSuccessResponse {
  status: string;
  code: number;
  data: WebPage;
}

export interface WebPageErrorResponse {
  status: string;
  code: number;
  message: string;
  details: WebPageErrorDetailResponse;
}

// Detalles de error de Validación
export interface WebPageErrorDetailResponse {
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
  | WebPagesPaginatedSuccessResponse;

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

export interface ApiResponseSuccessWebPage {
  status: string;
  code: number;
  data: ApiResponseWebPage;
}

export interface ApiResponseWebPage {
  identificador: number;
  url: string;
  nombre: string;
  descripcion: string;
  totalVisitas: number;
  tags: ApiResponseTag[];
}

export interface WebPageRequestBody {
  id: number;
  url: string;
  name: string;
  description: string;
  count_visits: number;
  tags: number[] | never[];
}
