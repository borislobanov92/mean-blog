export interface IUserAuthData {
  username: string;
  password: string;
  email?: string;
}

export interface IResponseData {
  success: boolean,
  message: string,
  token?: string,
  user?: IUserObject
}

export interface IUserObject {
  username: string,
  _id?: string,
  email?: string
}
