import { userModel } from './models/user.model.js';

export class UserManager {
    async createUser(user) {
        const newUser = new userModel(user);
        return await newUser.save();
    }

    async getUserByEmail(email) {
        return await userModel.findOne({ email: email }).lean();
    }

    async updateUser(user) {
        return await userModel.findOneAndUpdate({ email: user.email }, user).lean();
    }

    async deleteUser(email) {
        return await userModel.findOneAndDelete({ email: email }).lean();
    }
}