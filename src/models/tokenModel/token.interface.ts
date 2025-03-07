import { Document, Schema } from 'mongoose';

export interface IToken extends Document {
  token: string;
  user: Schema.Types.ObjectId;
  type: string;
  expires?: Date;
  blacklisted: boolean;
}
