import { EventType } from './event.types';

export interface Message {
    eventType: EventType.MSG;
    user: NewUser;
    message: string;
}

export interface NewUser {
    eventType: EventType.NEW_USER;
    username: string;
    id: number;
}
