export interface UserModel {
  id: any;
  email: string;
  username: string;
  lastname: string;
  firstname: string;
}

export interface NewUserModel {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface UsersModel {
  email: string;
  first_name: string;
  last_name: string;
  id: number;
}
