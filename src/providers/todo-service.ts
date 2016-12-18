import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {Todo} from "../models/todo";


@Injectable()
export class TodoService {
    todoApi = 'http://localhost:8080/api/todos';

    constructor(public http: Http) { }

    // Load all todos
    load(): Observable<Todo[]> {
        return this.http.get(this.todoApi)
        .map(res => <Todo[]>res.json());
    }

    // Add a todo
    add(todo: string): Observable<Todo> {
        let body = JSON.stringify({description: todo});
        let headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post(this.todoApi, body, {headers: headers})
        .map(res => <Todo>res.json())
        .catch(this.handleError);
    }

    // Update a todo
    update(todo: Todo) {
        let url = `${this.todoApi}/${todo._id}`; //see mdn.io/templateliterals
        let body = JSON.stringify(todo)
        let headers = new Headers({'Content-Type': 'application/json'});

        return this.http.put(url, body, {headers: headers})
        .map(() => todo) //See mdn.io/arrowfunctions
        .catch(this.handleError);
    }

    // Delete a todo
    delete(todo: Todo) {
        let url = `${this.todoApi}/${todo._id}`;
        let headers = new Headers({'Content-Type': 'application/json'});

        return this.http.delete(url, headers)
        .catch(this.handleError);
    }

    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
