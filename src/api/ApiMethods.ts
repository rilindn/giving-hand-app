import { AxiosResponse } from 'axios';
import { ILogin, IUser, IUserPayload } from 'interfaces/user';
import { IResetPassword, IValidateToken } from 'interfaces/resetToken';
import { IResetTokenSearch } from 'interfaces/resetToken';
import { IAllProductQuery, IProductPayload } from 'interfaces/product';
import { IProductRequestPayload } from 'interfaces/productRequest';
import { IChatPayload, IMessage, IMessagePayload } from 'interfaces/chat';
import { Client } from './ApiBase';

// Users
export async function getAllUsers() {
  try {
    const result: AxiosResponse = await Client.get(`user`);
    return result.data;
  } catch (err) {
    console.error('getAllUsers', err);
  }
}

export async function login(payload: ILogin) {
  try {
    const result: AxiosResponse = await Client.post(`auth/login`, payload);
    return result;
  } catch (err) {
    console.error('login', err);
  }
}

export async function loggedUser() {
  try {
    const result: AxiosResponse = await Client.get('user/loggedUser');
    return result.data;
  } catch (err) {
    console.error('loggedUser', err);
  }
}

export async function register(payload: IUser) {
  try {
    const result: AxiosResponse = await Client.post(`auth/register`, payload);
    return result;
  } catch (err) {
    console.error('register', err);
  }
}

export async function editProfile(userId: string | undefined, payload: IUserPayload) {
  try {
    const result: AxiosResponse = await Client.put(`user/${userId}`, payload);
    return result;
  } catch (err) {
    console.error('editProfile', err);
  }
}

export async function requestResetPassword(payload: IResetTokenSearch) {
  try {
    const result: AxiosResponse = await Client.post(`auth/password/request-reset`, payload);
    return result;
  } catch (err) {
    console.error('requestResetPassword', err);
  }
}

export async function resetPassword(payload: IResetPassword) {
  try {
    const result: AxiosResponse = await Client.post(`auth/password/reset`, payload);
    return result;
  } catch (err) {
    console.error('resetPassword', err);
  }
}

export async function validateResetToken(payload: IValidateToken) {
  try {
    const result: AxiosResponse = await Client.post(`auth/password/validate-token`, payload);
    return result;
  } catch (err) {
    console.error('validateResetToken', err);
  }
}

/* Product */

export async function newProduct(payload: IProductPayload) {
  try {
    const result: AxiosResponse = await Client.post(`product`, payload);
    return result;
  } catch (err) {
    console.error('newProduct', err);
  }
}

export async function getProducts({ search = '', categories = '', offset = 0, excludeIds = [] }: IAllProductQuery) {
  try {
    const result: AxiosResponse = await Client.get(
      `product?search=${search}&categories=${categories}&offset=${offset}&excludeIds=${excludeIds?.join(',') || ''}`
    );
    return result;
  } catch (err) {
    console.error('getProducts', err);
  }
}

export async function getProductById(id: string) {
  try {
    const result: AxiosResponse = await Client.get(`product/${id}`);
    return result;
  } catch (err) {
    console.error('getProductById', err);
  }
}

export async function getMyProducts(id: string, search: string, categories: string) {
  try {
    const result: AxiosResponse = await Client.get(
      `product/my-products/${id}?search=${search}&categories=${categories}`
    );
    return result;
  } catch (err) {
    console.error('getMyProducts', err);
  }
}

export async function editProduct(productId: string | undefined, payload: IProductPayload) {
  try {
    const result: AxiosResponse = await Client.put(`product/${productId}`, payload);
    return result;
  } catch (err) {
    console.error('newProduct', err);
  }
}

export async function deleteProduct(id: string) {
  try {
    const result: AxiosResponse = await Client.delete(`product/${id}`);
    return result;
  } catch (err) {
    console.error('deleteProduct', err);
  }
}

/* Product Request */

export async function getMyRequests(id: string, searchValue: string, status: string) {
  try {
    const result: AxiosResponse = await Client.get(
      `product-request/my-requests/${id}?search=${searchValue}&status=${status}`
    );
    return result;
  } catch (err) {
    console.error('getMyRequests', err);
  }
}

export async function newProductRequest(payload: IProductPayload) {
  try {
    const result: AxiosResponse = await Client.post(`product-request`, payload);
    return result;
  } catch (err) {
    console.error('newProductRequest', err);
  }
}

export async function editProductRequest(productRequestId: string | undefined, payload: IProductRequestPayload) {
  try {
    const result: AxiosResponse = await Client.put(`product-request/${productRequestId}`, payload);
    return result;
  } catch (err) {
    console.error('editProductRequest', err);
  }
}

/* Notifications */

export async function getMyNotifications(id: string) {
  try {
    const result: AxiosResponse = await Client.get(`notification/${id}`);
    return result;
  } catch (err) {
    console.error('getMyNotifications', err);
  }
}

export async function readAllNotifications(id: string) {
  try {
    const result: AxiosResponse = await Client.post(`notification/read-all/${id}`);
    return result;
  } catch (err) {
    console.error('readAllNotifications', err);
  }
}

/* Messages */

export async function getMyChats(userId: string, search: string) {
  try {
    const result: AxiosResponse = await Client.get(`chat/${userId}?search=${search}`);
    return result;
  } catch (err) {
    console.error('getMyChats', err);
  }
}

export async function newChat(payload: IChatPayload) {
  try {
    const result: AxiosResponse = await Client.post('chat', payload);
    return result;
  } catch (err) {
    console.error('newChat', err);
  }
}

export async function newMessage(id: string, payload: IMessagePayload) {
  try {
    const result: AxiosResponse = await Client.put(`chat/new-message/${id}`, payload);
    return result;
  } catch (err) {
    console.error('newMessage', err);
  }
}

export async function readAllMessages(chatId: string, receiverId: string) {
  try {
    const result: AxiosResponse = await Client.put(`chat/read-messages`, { chatId, receiverId });
    return result;
  } catch (err) {
    console.error('readAllMessages', err);
  }
}

export async function deleteMessage(chatId: string, messageId: string) {
  try {
    const result: AxiosResponse = await Client.delete(`chat/delete-message/${chatId}/${messageId}`);
    return result;
  } catch (err) {
    console.error('deleteMessage', err);
  }
}
