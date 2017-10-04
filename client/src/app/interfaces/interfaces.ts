export interface IUserAuthData {
  username: string;
  password: string;
  email?: string;
}

export interface IResponseData {
  success: boolean,
  message: string,
  token?: string,
  user?: any
}
