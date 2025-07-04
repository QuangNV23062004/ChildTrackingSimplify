export interface Consultation {
  id: string;
  requestId: string;
  status: number; // 0: Ongoing, 1: Completed
  rating: number;
  request: {
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
  };
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
