import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IGuest extends Document {
  name: string;
  slug: string;
  createdAt: Date;
}

const GuestSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the guest.'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug for the guest URL.'],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Guest: Model<IGuest> = mongoose.models.Guest || mongoose.model<IGuest>('Guest', GuestSchema);
