import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
export class SharedDataService  { 
  // another approach is to use input binding
  // https://angular.io/guide/component-interaction#pass-data-from-parent-to-child-with-input-binding

  private listId = new BehaviorSubject<number>(0);
  listId$ = this.listId.asObservable();

  setListId(id:number) {
      this.listId.next(id);
    }
}