import { IUser } from 'interfaces/user';

export interface IMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  media?: string;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IMessagePayload {
  senderId: string;
  receiverId: string;
  text: string;
  media?: string;
}

export interface IChat {
  _id: string;
  firstUserId: string;
  secondUserId: string;
  messages: IMessage[];
  otherUser: IUser;
}

export interface IChatPayload {
  firstUserId: string;
  secondUserId: string;
}
