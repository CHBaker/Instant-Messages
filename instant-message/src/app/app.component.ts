import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocketService } from './socket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    messages = [];
    messageForm: FormGroup;
    ioConnection: any;

    constructor(
        private socketService: SocketService,
        private fb: FormBuilder) {}

    ngOnInit(): void {
        this.initIoConnection();
        this.initMessageForm();
    }

    initIoConnection(): void {
        this.socketService.initSocket();

        this.ioConnection = this.socketService.onMessage()
            .subscribe((msg) => {
                this.messages.push(msg);
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
}
