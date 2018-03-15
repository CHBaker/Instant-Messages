import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-out-message',
    templateUrl: './out-message.component.html',
    styleUrls: ['./out-message.component.scss']
})
export class OutMessageComponent implements OnInit {
    @Input() message: string;
    @Input() username: string;

    constructor() {}

    ngOnInit() {}
}
