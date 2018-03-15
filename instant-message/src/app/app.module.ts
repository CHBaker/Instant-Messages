import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SocketService } from './socket.service';
import { DynamicTextareaDirective } from 'dynamic-textarea-directive';
import { InMessageComponent } from './messages/in-message/in-message.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [
    AppComponent,
    DynamicTextareaDirective,
    InMessageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  providers: [
      SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
