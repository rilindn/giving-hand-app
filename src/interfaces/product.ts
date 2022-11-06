import { IUser } from 'interfaces/user';
import { IProductRequest } from './productRequest.';

interface Images {
  url: string;
}

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  images: Images[];
  userId: string;
  location: string;
  categories: string[];
  user?: IUser[];
  requests?: IProductRequest[];
  createdAt: string;
  updatedAt: string;
}

export interface IProductPayload {
  title: string;
  description: string;
  images?: Images[];
  userId: string;
  location: string;
  categories?: string[];
}

export interface IAllProductQuery {
  search?: string;
  categories?: string;
}
