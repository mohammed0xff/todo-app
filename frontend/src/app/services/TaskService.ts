import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Task } from '../constants/Task'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  [x: string]: any;

  constructor(private http:HttpClient) { }

  GetTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`);
  }

  AddTask(taskDescription:string) :Observable<any> {
    return this.http.post(`${environment.apiUrl}/tasks`, { Description: taskDescription });
  }

  ToggleCompleted(taskId:number) :Observable<any> {
    return this.http.put(`${environment.apiUrl}/tasks/toggle-completed/${taskId}`, null);
  }

  DeleteTask(taskId: number) :Observable<any> {
    return this.http.delete(`${environment.apiUrl}/tasks/${taskId}`);
  }

}
