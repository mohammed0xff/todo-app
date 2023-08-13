import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Task } from '../constants/Task'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  GetTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`);
  }
  
  ToggleCompleted(taskId:number) :Observable<any> {
    return this.http.put(`${environment.apiUrl}/tasks/toggle-completed/${taskId}`, null);
  }

  DeleteTask(taskId: number) :Observable<any> {
    return this.http.delete(`${environment.apiUrl}/tasks/${taskId}`);
  }

}
