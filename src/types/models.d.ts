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
  totalHours: Date | null;
  tags: Tag[];
  status: Status[];
  progress: Progress[];
}

interface Status {
  id: number;
  date: Date;
  comment: string | null;
  statusId: number;
  recourseId: number;
  statusName: string;
}

interface Progress {
  id: number;
  done: number;
  pending: number;
  date: Date;
  comment: string;
  recourseId: number;
}
