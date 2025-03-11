import { Document, Model, Types } from 'mongoose';

export interface IPhoneNumber {
  countryCode: string;
  number: string;
  isPhoneVerified?: boolean;
}

export interface IUserDetails {
  rollNo?: number;
  name: string;
  fatherName: string;
  address: string;
  class?: string;
  hostelRoomNo?: string;
  hostelName: string;
  startDate?: Date;
  endDate?: Date;
  subscribe?: number;
  aadharCardNumber: string;
}

export interface IUser extends Document {
  role: number;
  email: string;
  isEmailVerified?: boolean;
  password?: string;
  phoneNumber: IPhoneNumber;
  status?: number;
  isDeleted: boolean;
  authToken: string;
  messId: Types.ObjectId | null;
  details: IUserDetails;
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface UserModel extends Model<IUser> {
  paginate(
    filter: object,
    options: { sortBy?: string; limit?: number; page?: number }
  ): unknown;
  isEmailTaken(email: string, excludeUserId?: string): Promise<boolean>;
}
