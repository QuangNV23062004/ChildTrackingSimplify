export interface Request {
  id: string;
  memberId: string;
  childId: string;
  doctorId: string;
  status: number;
  message: string;
  doctor: {
    id: string;
    name: string;
    email: string;
  };
  member: {
    id: string;
    name: string;
    email: string;
  };
  child: {
    id: string;
    name: string;
  } | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RequestResponse {
  page?: number;
  total?: number;
  totalPages?: number;
  message?: string | null;
  data?: {
    page: number;
    total: number;
    totalPages: number;
    data: Request[];
    message: string | null;
  };
}
