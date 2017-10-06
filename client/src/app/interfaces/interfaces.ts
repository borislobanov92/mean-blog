export interface IUserAuthData {
  username: string;
  password: string;
  email?: string;
}

export interface IResponseData {
  success: boolean;
  message: string;
  token?: string;
  user?: IUserObject;
}

export interface IUserObject {
  username: string;
  _id?: string;
  email?: string;
}

export interface IBlogEntry {
  title: string;
  body: string;
  createdBy?: string;
  createdAt?: Date;
  likes?: number;
  likedBy?: IUserObject[];
  dislikes?: number;
  dislikedBy?: IUserObject[];
  comments?: IComment;
}

export interface IComment {
  comment: string;
  commentator: string;
}
