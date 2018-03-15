import { Message } from './models/message.model';
import { User } from './models/user.model';
import { NewUser } from './models/event.models';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocketService } from './socket.service';

import 'rxjs/add/operator/merge';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    user: NewUser;
    allEvents = [];
    messageForm: FormGroup;

    msgConnection: any;
    userConnection: any;

    constructor(
        private socketService: SocketService,
        private fb: FormBuilder) {}

    ngOnInit(): void {
        this.initIoConnection();
        this.initMessageForm();
    }

    initIoConnection(): void {
        this.socketService.initSocket();

        this.msgConnection = this.socketService.onMessage()
            .subscribe((msg) => {
                console.log(msg);
                this.allEvents.push(msg);
            });

        this.userConnection = this.socketService.onNewUser()
            .subscribe((user: NewUser) => {
                console.log('new user ', user);

                // check if new user is the current user, if so, skip notifying user
                if (this.user === undefined || user.id !== this.user.id) {
                    this.allEvents.push(user);
                }
            });

        this.socketService.onEvent('connected')
            .subscribe(() => console.log('connected'));

        this.socketService.onEvent('disconnected')
            .subscribe(() => console.log('disconnected'));
    }

    initMessageForm(): void {
        this.messageForm = this.fb.group({
            msg: [null, Validators.required]
        });
    }

    onSubmit(form: FormGroup): void {
        const msg = form.controls['msg'].value;

        // create msg object with event type and user
        const newMsg = new Message(this.user, msg);
        console.log(newMsg);
        this.socketService.sendMessage(newMsg);

        this.messageForm.reset();
    }

    trackByIndex(index) {
        return index;
    }

    loginUser(user: NewUser) {
        this.user = user;
        console.log(this.allEvents);
    }
}
