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
  unitMeasureProgressId: number;
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
  advanced: number;
  date: string;
  comment: string;
  recourseId?: number;
  isLastRecord: boolean;
  total: number;
}

interface Settings {
  id: number;
  type: string;
  key: string;
  value: string;
  value2: string;
}

interface YoutubeSubscription {
  id: number;
  youtubeId: string;
  userId: number;
  channelId: string;
  title: string;
  publishedAt: string;
  description: string;
  thumbnailDefault: string;
  thumbnailMedium: string;
  thumbnailHigh: string;
  tags: Tag[];
}

interface WebPage {
  id: number;
  url: string;
  name: string;
  description: string;
  countVisits: number;
  tags: Tag[];
}
