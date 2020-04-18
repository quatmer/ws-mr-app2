export interface IUser extends IUserDocument {
  _id: string;
}
export interface IUserDocument {
  username: string;
  password: string;
  userType: UserType;
  name: string;
  email: string;
  telephone: string;
  address: UserAddress;
}

export interface UserAddress {
  postCode: string;
  city: string;
}

export enum UserType {
  admin = 'admin',
  client = 'client',
}
