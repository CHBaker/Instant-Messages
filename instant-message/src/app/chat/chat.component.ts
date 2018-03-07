import { Component, OnInit } from '@angular/core';

import { Action } from './shared/model/client-enums';
import { Event } from './shared/model/client-enums';
import { Message } from './shared/model/message';
import { User } from './shared/model/user';
import { SocketService } from './shared/services/socket.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    action = Action;
    user: User;
    messages: Message[] = [];
    messageContent: string;
    ioConnection: any;

    constructor(private socketService: SocketService) { }

    ngOnInit(): void {
        this.initIoConnection();
    }

    initIoConnection(): void {
        this.socketService.initSocket();

        this.ioConnection = this.socketService.onMessage()
            .subscribe(
                (message: Message) => {
                    this.messages.push(message);
                },
                (error) => console.log(error)
        );

        this.socketService.onEvent(Event.CONNECT)
            .subscribe(
                () => {
                console.log('connected');
                },
                (error) => console.log(error)
        );

        this.socketService.onEvent(Event.DISCONNECT)
            .subscribe(
                () => {
                    console.log('disconnected')
                },
                (error) => console.log(error)
        );
    }

    public sendMessage(message: string): void {
        if (!message) {
            return;
        }

        this.socketService.send({
            from: this.user,
            content: message
        });
        this.messageContent = null;
    }

    public sendNotification(params: any, action: Action): void {
        let message: Message;

        if (action === Action.JOINED) {
            message = {
                from: this.user,
                action: action
            }
        } else if (action === Action.RENAME) {
            message = {
                action: action,
                content: {
                    username: this.user.name,
                    previousUsername: params.previousUsername
                }
            }
        }

        this.socketService.send(message)
    }

}
