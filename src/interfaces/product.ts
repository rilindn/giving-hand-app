import { IUser } from 'interfaces/user';
import { IProductRequest } from './productRequest';

interface Images {
  url: string;
}

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  images: Images[];
  userId: string;
  location: ILocation;
  categories: string[];
  user?: IUser;
  requests: IProductRequest[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IProductPayload {
  title: string;
  description: string;
  images?: Images[];
  userId: string;
  categories?: string[];
  location: ILocation;
}

export interface ILocation extends google.maps.LatLngLiteral {
  address: string;
  _id?: string;
}

export interface IAllProductQuery {
  search?: string;
  categories?: string;
  offset?: number;
  limit?: number;
  excludeIds?: Array<string>;
}
