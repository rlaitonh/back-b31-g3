import {Schema} from "mongoose";
import * as bcrypt from 'bcrypt';

export const UserSchema = new Schema ({

    firstname: {type: String, required:true},
    lastname: {type: String, required:true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    state: {
        type: String, 
        required: true,
        default: 'Active',
        enum : ['Active', 'inactive']
    },
    role: {
        type: String,
        required: true,
        default: 'Customer',
        enum: ['Customer', 'Manager']
    }

});

UserSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});



