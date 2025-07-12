export interface Consultation {
  id: string;
  requestId: string;
  status: number; // 0: Ongoing, 1: Completed
  rating: number;
  request: any;
  doctor?: { name?: string; email?: string };
  member?: { name?: string; email?: string };
  child?: { name?: string };
  isDeleted: boolean;
  createdAt: string;
  updatedAt?: string;
}
