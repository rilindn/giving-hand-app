import { IUser } from 'interfaces/user';

export interface IProductRequest {
  _id: string;
  description: string;
  userId: string;
  status: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  requester: IUser;
  __v: number;
}

export interface IProductRequestPayload {
  description: string;
  userId: string;
  productId: string;
  status: string;
}

export interface IProductRequestGetParams {
  id?: string;
}
