import { Component } from '@angular/core';

import { NavController, ItemSliding, Item } from 'ionic-angular';

import {TodoService} from "../../providers/todo-service";
import {Todo} from "../../models/todo";
import {TodoEditPage} from "../todo-edit/todo-edit";



@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    todos: Todo[]

    constructor(public navCtrl: NavController, private todoService: TodoService) {
        todoService.load().subscribe(todos => {
            this.todos = todos;
        })


    }

    addTodo(todo:string) {
        this.todoService.add(todo)
        .subscribe(data => {
            this.todos.push(data)
        });
    }

    toggleComplete(todo: Todo) {
        todo.isComplete = !todo.isComplete;
        this.todoService.update(todo)
        .subscribe(data => {
            todo = data;
        })
    }

    deleteTodo(todo: Todo, index:number) {
        this.todoService.delete(todo)
        .subscribe(response => {
            this.todos.splice(index, 1);
        });
    }

    navToEdit(todo: Todo, index: number) {
        this.navCtrl.push(TodoEditPage, {
            todo: todo,
            todos: this.todos,
            index: index
        });
    }

    slide(slidingItem: ItemSliding) {
        slidingItem.close();
    }

}
