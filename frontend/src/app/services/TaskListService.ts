import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Task } from '../constants/Task'
import { TaskList } from '../constants/TaskList';
import { PaginatedResponse } from '../constants/PaginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  constructor(private http:HttpClient) { }

  GetLists(pageNumber: number, pageSize: number): Observable<PaginatedResponse<TaskList>> {
    return this.http.get<PaginatedResponse<TaskList>>(
      `${environment.apiUrl}/tasklists?pagenumber=${pageNumber}&pagesize=${pageSize}`
      );
  }

  AddList(listTitle :string) :Observable<any> {
    return this.http.post(`${environment.apiUrl}/tasklists`, 
      { title: listTitle }
    );
  }

  DeleteList(listId: number) :Observable<any> {
    return this.http.delete(`${environment.apiUrl}/tasklists/${listId}`);
  }

}
