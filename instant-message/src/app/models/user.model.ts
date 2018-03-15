import { EventType } from './event.types';

export class User {
    eventType: EventType.NEW_USER;
    username: string;
    id: number;

    constructor(username: string) {
        const randId = Math.floor(Math.random() * 100);
        this.username = username;
        this.id = randId;
        this.eventType = EventType.NEW_USER;
    }
}
