export type login = {
    email: string;
    password: string;
}


export type signup = {
    userName: string;
    email: string;
    password: string;
    fullName: string;
    avatar?: File;
    coverImage?: File;
}

export type getUserChannel = string;