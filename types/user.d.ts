declare type CreateUserParams = {
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
    photo: string;
};

declare type UpdateUserParams = {
    firstName: string;
    lastName: string;
    photo: string;
};


declare type User = {
    id: string;
    email: string;
    photoUrl: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt?: Date
}