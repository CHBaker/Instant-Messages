export interface Message {
    user: NewUser;
    message: string;
}

export interface NewUser {
    username: string;
    id: number;
}
