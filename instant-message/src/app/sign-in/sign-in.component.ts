import { NewUser } from './../models/event.models';
import { SocketService } from './../socket.service';
import { User } from './../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
    Component,
    OnInit,
    ViewChild,
    Renderer2,
    Output,
    EventEmitter
} from '@angular/core';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    userForm: FormGroup;
    showModal = false;
    user: NewUser;

    @Output() loginUser: EventEmitter<NewUser> = new EventEmitter<NewUser>();

    constructor(
        private socketService: SocketService,
        private fb: FormBuilder,
        private renderer: Renderer2
    ) {}

    ngOnInit() {
        this.initUserForm();
    }

    initUserForm() {
        this.userForm = this.fb.group({
            username: [null, Validators.required]
        });
        this.showModal = true;
    }

    onSubmit(form: FormGroup) {
        const username = form.controls['username'].value;
        this.user = new User(username);
        this.loginUser.emit(this.user);

        this.socketService.sendUser(this.user);

        this.showModal = false;
    }
}
