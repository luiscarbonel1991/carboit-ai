declare type CreateUserParams = {
    clerkId: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    photo: string;
};

declare type UpdateUserParams = {
    firstName: string;
    lastName: string;
    username: string;
    photo: string;
};


declare type User = {
    id: string;
    email: string;
    username: string;
    photoUrl: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt?: Date
}