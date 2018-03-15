import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-in-message',
    templateUrl: './in-message.component.html',
    styleUrls: ['./in-message.component.css']
})
export class InMessageComponent implements OnInit {
    @Input() message: string;
    @Input() username: string;

    constructor() {}

    ngOnInit() {}
}
