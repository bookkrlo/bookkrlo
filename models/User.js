import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
    {
        email: {
            type: String,
        },
        fullName: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const User = models.User || model('User', UserSchema);

export default User;
