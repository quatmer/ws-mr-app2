import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUserDocument } from '@ws-mr-app2/models';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const UserAddressSchema = new Schema(
  {
    postCode: String,
    city: String
  },
  { versionKey: false, _id: false, id: false }
);

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    telephone: String,
    address: { type: [UserAddressSchema] },
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    userType: { type: String, enum: ['admin', 'client'], default: 'client`' }
  },
  { timestamps: true, versionKey: false, bufferCommands: false }
);

mongooseUniqueValidator(UserSchema);

export interface UserDocument extends IUserDocument, Document {
  isPasswordValid(password: string): string;
}

// check password is valid
UserSchema.methods.isPasswordValid = function(password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

// crypt password before save
UserSchema.pre<UserDocument>('save', function(next) {
  if (this.password && this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password);
  }
  next();
});

// Delete password before sending user model
UserSchema.set('toJSON', {
  transform: function(_, ret) {
    delete ret.password;
    return ret;
  },
  getters: true
});

export const UserEntity = model<UserDocument>('User', UserSchema);
