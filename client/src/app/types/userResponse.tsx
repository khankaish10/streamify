export type userResponse<T> = {
    data: {
        data: T;
        message: string;
        success: boolean;
    }
}


export type loginResponsePayload = {
    accessToken: string;
    avatar: string;
    coverImage: string;
    createdAt: string;
    email: string;
    fullName: string;
    userName: string;
    _id: string;
}

export type signupResponsePayload = {
    accessToken: string;
    avatar: string;
    coverImage: string;
    createdAt: string;
    email: string;
    fullName: string;
    userName: string;
    _id: string;
}

export type getProfileResponsePayload = {
    allvideos: [];
    avatar: string;
    coverImage: string;
    email: string;
    fullName: string;
    subscriberCount: number
    userName: string;
    _id: string;
}