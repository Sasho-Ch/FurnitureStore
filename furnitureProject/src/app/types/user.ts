export interface User {
  furnitures: string[];
  _id: string;
  tel: string;
  email: string;
  username: string;
  password: string;
  __v: number;
}

export interface UserForAuth {
  username: string;
  email: string;
  tel: string;
  password: string;
  id: string;
}

export interface ProfileDetails {
    username: string,
    email: string,
    tel: string,
  }