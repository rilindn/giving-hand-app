export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  birthDate: string;
}
export interface IUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthDate: string;
}

export interface ILogin {
  email: string;
  password: string;
}
