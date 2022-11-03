import { AxiosResponse } from 'axios';
import { Client } from './ApiBase';
import { ILogin, IUser } from 'interfaces/user';
import { IResetPassword, IValidateToken } from 'interfaces/resetToken';
import { IResetTokenSearch } from 'interfaces/resetToken';
import { IProductPayload } from 'interfaces/post';

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

export async function getAllProducts() {
  try {
    const result: AxiosResponse = await Client.get(`product`);
    return result;
  } catch (err) {
    console.error('getAllProducts', err);
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

/* Product Request */

export async function newProductRequest(payload: IProductPayload) {
  try {
    const result: AxiosResponse = await Client.post(`product-request`, payload);
    return result;
  } catch (err) {
    console.error('newProductRequest', err);
  }
}
