import { IUser } from 'interfaces/user';
import { IProduct } from 'interfaces/product';

export interface IProductRequest {
  _id: string;
  description: string;
  userId: string;
  status: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  requester: IUser;
  product?: IProduct;
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
