import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { SocketService } from './shared/services/socket.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChatComponent],
  providers: [SocketService]
})
export class ChatModule { }
