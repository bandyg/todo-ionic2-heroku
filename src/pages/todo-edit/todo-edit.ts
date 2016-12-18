import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {Todo} from "../../models/todo";
import {TodoService} from "../../providers/todo-service";



@Component({
    selector: 'page-todo-edit',
    templateUrl: 'todo-edit.html'
})
export class TodoEditPage {
    todo: Todo;
    todos: Todo[];
    index: number;

    constructor(public navCtrl: NavController, private todoService: TodoService,
        public navParams: NavParams) {
            this.todo = navParams.get('todo');
            this.todos = navParams.get('todos');
            this.index = navParams.get('index');
        }

        saveTodo(updateDescription: string) {
            this.todo.description = updateDescription;
            this.todoService.update(this.todo)
            .subscribe(response => {
                this.navCtrl.pop();
            });
        }

        deleteTodo() {
            this.todoService.delete(this.todo)
            .subscribe(response => {
                this.todos.splice(this.index, 1); // remove the todo
                this.navCtrl.pop(); //go back to todo list
            });
        }
    

}
