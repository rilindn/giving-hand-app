export interface IProductRequest {
  _id: string;
  description: string;
  userId: string;
  productId: string;
}

export interface IProductRequestPayload {
  description: string;
  userId: string;
  productId: string;
}

export interface IProductRequestGetParams {
  id?: string;
}
