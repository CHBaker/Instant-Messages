import { Injectable } from '@angular/core';
import * as socket from 'socket.io-client';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class SocketService {
    socket;

    initSocket() {
        this.socket = socket('localhost:8383');
    }

    sendMessage(msg) {
        this.socket.emit('OUTGOING_MSG', msg);
        console.log('msg sent');
    }

    onMessage() {
        return new Observable<any>(observer => {
            this.socket.on('INCOMING_MSG', (msg) => observer.next(msg));
        });
    }

    onEvent(event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
