import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TaskList } from "../constants/TaskList";


@Injectable({
    providedIn: 'root'
  })
export class SharedDataService  { 
  // another approach is to use input binding
  // https://angular.io/guide/component-interaction#pass-data-from-parent-to-child-with-input-binding

  private list = new BehaviorSubject<TaskList>({id : 0, title : ""});
  list$ = this.list.asObservable();

  setList(list:TaskList) {
    this.list.next(list);
  }
}