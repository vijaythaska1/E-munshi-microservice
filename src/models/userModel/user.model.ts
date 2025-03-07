import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import validator from 'validator';
import { roles, subscribe, userStatus } from '../../config/roles';
import { paginate, toJSON } from '../plugins';
// import { UNAVAILABLE_FOR_LEGAL_REASONS } from "http-status";
import { IUser, UserModel } from './user.interface';

const userSchema = new mongoose.Schema<IUser, UserModel>({
  role: {
    type: String,
    required: [true, 'role is required'],
    enum: roles,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email address');
      }
    },
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    // required: [true, "Password is required"],
    trim: true,
    minlength: 8,
    validate(value: string) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error(
          'Password must contain at least one letter and one number'
        );
      }
    },
    private: true,
  },
  phoneNumber: {
    countryCode: {
      type: String,
      required: [true, 'Country code is required'],
      validate(value: string) {
        const regex = /^\+[1-9]\d{1,3}$/;
        if (!regex.test(value)) {
          throw new Error('Invalid country code format');
        }
      },
    },

    number: {
      type: String,
      required: [true, 'Phone is required'],
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isMobilePhone(value)) {
          throw new Error('Invalid phone number');
        }
      },
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
  },
  status: {
    type: Number,
    enum: userStatus,
    trim: true,
    default: 0, // 0 - inactive, 1 - active
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: true,
    description: 'Indicates whether the record is deleted or active',
  },
  authToken: {
    type: String,
    private: true,
    trim: true,
  },
  details: {
    rollNo: {
      type: Number,
      // required: [true, "RoleNo is required"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    fatherName: {
      type: String,
      required: [true, 'father Name is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    class: {
      type: String,
      // required: [true, "Class is required"],
      trim: true,
    },
    hostelRoomNo: {
      type: String,
      // required: [true, "HostelRoomNo is required"],
      trim: true,
    },
    hostelName: {
      type: String,
      required: [true, 'Hostel Name is required'],
      trim: true,
    },
    startDate: {
      type: Date,
      // required: [true, "Start Date is required"],
      trim: true,
    },
    endDate: {
      type: Date,
      // required: [true, "End Date is required"],
      trim: true,
    },
    subscribe: {
      type: Number,
      enum: subscribe,
      // required: [true, "End Date is required"],
      trim: true,
    },
    image: {
      type: String,
      // required: [true, "End Date is required"],
      trim: true,
    },
    aadharCardNumber: {
      type: String,
      trim: true,
      required: [true, 'Aadhar Card Number is required'],
      validate(value: string) {
        if (!/^[0-9]{12}$/.test(value)) {
          throw new Error('Aadhar Card Number must be a 12-digit number');
        }
      },
    },
  },
});

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (
  email: string,
  excludeUserId?: string
) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

// userSchema.statics.isUsernameTaken = async function (
//   userName: string,
//   excludeUserId?: string
// ) {
//   const user = await this.findOne({ userName, _id: { $ne: excludeUserId } });
//   return !!user;
// };

userSchema.methods.isPasswordMatch = async function (password: string) {
  const user = this as IUser;
  return bcrypt.compare(password, user.password);
};

userSchema.pre<IUser>('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
