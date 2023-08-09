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
  tags: Tag[];
  status: Status[];
  progress: Progress[];
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
}

interface Progress {
  id: number;
  done: number;
  pending: number;
  date: string;
  comment: string;
  recourseId?: number;
}

interface Settings {
  id: number;
  type: string;
  key: string;
  value: string;
}
