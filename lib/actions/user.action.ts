'use server';

import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import { dbConnect } from "../database/mongoose";
import { handleError } from "../utils";

export const createUser = async (user: CreateUserParams) => {
    try {
        await dbConnect();
        
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error);
    }
}

export const findUserBy = async (clerkId: string) => {
    try {
        await dbConnect();

        const user = await User.findOne({
            clerkId: clerkId
        })

        if (!user) {
            throw new Error('User not found');
        }

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error);
    }
}

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
    try {
        await dbConnect();

        const updatedUser = await User.findOneAndUpdate({
            clerkId: clerkId
        }, user, {
            new: true
        });

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error);
    }
}


export const deleteUser = async (clerkId: string) => {
    try {
        await dbConnect();

        const userToDelete = await User.findOne({
            clerkId: clerkId
        });

        if (!userToDelete) {
            throw new Error('User not found');
        }

        const deletedUser = await User.findByIdAndDelete(userToDelete._id);
        revalidatePath("/")

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        handleError(error);
    }
}

export const updateUserCreditBalance = async (id: string, creditBalanceFee: number) => {
    try {
        await dbConnect();

        const updatedUser = await User.findOneAndUpdate(
            { _id: id},
            { $inc: { creditBalance: creditBalanceFee }},
            { new: true }
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error);
    }
}
