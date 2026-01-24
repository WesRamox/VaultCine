export interface Group {
  id: string;
  name: string;
  description?: string;
  type: "COUPLE" | "FRIENDS" | "FAMILY"
  ratingAverage: number;
  members: number;
  ownerId: string;
  createdAt: string;
}

export interface CreateGroupDTO {
  name: string;
  description?: string;
}