import { Injectable } from '@angular/core';
import * as socket from 'socket.io-client';

@Injectable()
export class SocketService {
    socket;

    listen() {
        this.socket = socket('localhost:8383');
    }

}
