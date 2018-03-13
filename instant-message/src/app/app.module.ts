import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SocketService } from './socket.service';
import { AutoGrowDirective } from './shared/auto-grow.directive';


@NgModule({
  declarations: [
    AppComponent,
    AutoGrowDirective
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
