interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  rememberToken?: string | null;
}

interface Tag {
  id: number;
  name: string;
  style: string;
  total: number;
}

interface Recourse {
  id: number;
  name: string;
  source: string;
  author: string | null;
  editorial: string | null;
  typeId: number;
  totalPages: number | null;
  totalChapters: number | null;
  totalVideos: number | null;
  totalHours: string | null;
  totalProgressPercentage: number;
  tags: Tag[];
  status: Status | Status[];
  progress: Progress | Progress[];
  currentStatusName?: string;
  typeName?: string;
}

interface Status {
  id: number;
  date: string;
  comment: string | null;
  statusId: number;
  recourseId?: number;
  statusName: string;
  isLastRecord: boolean;
}

interface Progress {
  id: number;
  done: number;
  pending: number;
  date: string;
  comment: string;
  recourseId?: number;
  isLastRecord: boolean;
}

interface Settings {
  id: number;
  type: string;
  key: string;
  value: string;
  value2: string;
}

interface YoutubeSubscription {
  id: string;
  user_id: number;
  channel_id: string;
  title: string;
  published_at: string;
  description: string;
  thumbnail_default: string;
  thumbnail_medium: string;
  thumbnail_high: string;
  tags: Tag[];
}
