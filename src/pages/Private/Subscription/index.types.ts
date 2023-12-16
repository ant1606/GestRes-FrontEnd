export interface YoutubeSubscriptionsSuccessRespose {
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
  usuarioId: string;
  canalId: string;
  titulo: string;
  fechaSubscripcion: string;
  descripcion: string;
  fotoDefault: string;
  fotoMedium: string;
  fotoHigh: string;
}

export interface YoutubeSubscriptionSuccessResponse {
  data: YoutubeSubscription;
}
