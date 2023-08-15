import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Task } from '../constants/Task'
import { TaskList } from '../constants/TaskList';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  constructor(private http:HttpClient) { }

  GetLists(): Observable<TaskList[]> {
    return this.http.get<TaskList[]>(`${environment.apiUrl}/tasklists`);
  }

  AddList(listTitle :string) :Observable<any> {
    return this.http.post(`${environment.apiUrl}/tasklists`, 
      { title: listTitle }
    );
  }

  DeleteTask(listId: number) :Observable<any> {
    return this.http.delete(`${environment.apiUrl}/tasklists/${listId}`);
  }

}
