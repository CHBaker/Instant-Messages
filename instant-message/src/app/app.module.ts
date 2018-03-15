import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SocketService } from './socket.service';
import { DynamicTextareaDirective } from 'dynamic-textarea-directive';
import { InMessageComponent } from './messages/in-message/in-message.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SignInComponent } from './sign-in/sign-in.component';


@NgModule({
  declarations: [
    AppComponent,
    DynamicTextareaDirective,
    InMessageComponent,
    SignInComponent
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
