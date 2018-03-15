export class User {
    username: string;
    id: number;

    constructor(username: string) {
        const randId = Math.floor(Math.random() * 100);
        this.username = username;
        this.id = randId;
    }
}
