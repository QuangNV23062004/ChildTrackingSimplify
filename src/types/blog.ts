export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export enum BlogStatus {
  Draft = 0,
  Published = 1,
  Archived = 2,
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  contentImageUrls: string[];
  status: BlogStatus;
  userId: string;
  user?: User | null;
  createdAt?: string;
  updatedAt?: string;
}
