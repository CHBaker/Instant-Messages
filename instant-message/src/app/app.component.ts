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
    messages$: Observable<any>;
    messageForm: FormGroup;

    constructor(
        private socketService: SocketService,
        private fb: FormBuilder) {}

    ngOnInit(): void {
        this.socketService.listen();
        this.initMessageForm();
    }

    initMessageForm(): void {
        this.messageForm = this.fb.group({
            msg: ['', Validators.required]
        });
    }

    onSubmit(form: FormGroup): void {

    }

    trackByIndex(index) {
        return index;
    }
}
