import { IUser } from 'interfaces/user';
import { IProduct } from './product';

export interface INotification {
  _id: string;
  type: string;
  read: boolean;
  senderId: string;
  receiverId: string;
  sender: IUser;
  product?: IProduct;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface INotificationTransformed {
  _id: string;
  sender: string;
  description: string;
  date: string;
  seen: boolean;
}

export interface INotificationGetParams {
  id?: string;
}
