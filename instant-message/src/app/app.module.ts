import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SocketService } from './socket.service';
import { DynamicTextareaDirective } from 'dynamic-textarea-directive';


@NgModule({
  declarations: [
    AppComponent,
    DynamicTextareaDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
      SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
