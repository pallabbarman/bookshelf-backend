/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import { compare, hash } from 'bcrypt';
import envConfig from 'configs/env.config';
import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from 'types/user';

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
    {
        name: {
            type: {
                firstName: {
                    type: String,
                    required: true,
                },
                lastName: {
                    type: String,
                    required: true,
                },
            },
            required: true,
            _id: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            required: true,
            enum: ['user'],
            default: 'user',
        },
        address: {
            type: String,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform(_doc, ret) {
                delete ret.password; // Exclude the password field from the JSON object
            },
        },
    }
);

userSchema.methods.isUserExist = async function (email: string): Promise<Partial<IUser | null>> {
    const user = await User.findOne(
        { email },
        {
            id: 1,
            role: 1,
            email: 1,
            password: 1,
        }
    );

    return user;
};

userSchema.methods.isPasswordMatched = async function (
    givenPassword: string,
    savedPassword: string
): Promise<boolean> {
    const isMatched = await compare(givenPassword, savedPassword);

    return isMatched;
};

userSchema.pre('save', async function (next) {
    this.password = await hash(this.password, Number(envConfig.bcrypt_salt_round));

    next();
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;
