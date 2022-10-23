export interface IResetToken {
  _id: string;
  userId: string;
  email: string;
  token: string;
  expiration: Date;
}

export interface IResetTokenSearch {
  userId?: string;
  email?: string;
  token?: string;
  expiration?: Date;
}

export interface IResetPassword {
  email: string;
  password: string;
  resetToken: string;
}

export interface IValidateToken {
  email: string;
  token: string;
}
