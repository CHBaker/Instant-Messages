import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as socket from 'socket.io-client';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    messages$: Observable<any>;
    messageForm: FormGroup;
    socket = socket('localhost:8383');

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.initMessageForm();
        this.listen();
    }

    initMessageForm(): void {
        this.messageForm = this.fb.group({
            msg: ['', Validators.required]
        });
    }

    listen(): void {}

    onSubmit(form: FormGroup): void {

    }

    trackByIndex(index) {
        return index;
    }
}
