import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TodoEditPage } from '../pages/todo-edit/todo-edit';

import {TodoService} from "../providers/todo-service";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TodoEditPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TodoEditPage
  ],
  providers: [TodoService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
