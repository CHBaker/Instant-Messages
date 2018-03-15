import { NewUser } from './event.models';
import { EventType } from './event.types';

export class Message {
    eventType: EventType.MSG;
    user: NewUser;
    message: string;

    constructor(user: NewUser, message: string) {
        this.user = user;
        this.message = message;
        this.eventType = EventType.MSG;
    }
}
