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
                this.allEvents.push(msg);
            });

        this.userConnection = this.socketService.onNewUser()
            .subscribe((user) => {
                console.log('new user ', user);
                const msg = this.userNotification(user.username);
                this.allEvents.push(msg);
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
        this.socketService.sendMessage(form.controls['msg'].value);
        this.messageForm.reset();
    }

    trackByIndex(index) {
        return index;
    }

    userNotification(username) {
        return `${username} joined chat`;
    }

    loginUser(user: NewUser) {
        this.user = user;
    }
}
