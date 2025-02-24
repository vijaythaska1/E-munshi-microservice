import { Document, Model } from 'mongoose';

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  age: number;
  role: string;
  isPasswordMatch: (password: string) => Promise<boolean>;
}

export interface UserModel extends Model<IUser> {
  isEmailTaken: (email: string, excludeUserId?: string) => Promise<boolean>;
  isAddressTaken: (address: string, excludeUserId?: string) => Promise<boolean>;
  isUsernameTaken: (
    userName: string,
    excludeUserId?: string
  ) => Promise<boolean>;
}
