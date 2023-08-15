import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { SharedDataService  } from '../services/SharedDataService';
import { TaskListService } from '../services/TaskListService';
import { TaskList } from '../constants/TaskList';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent {
  lists: TaskList[] = []
  selectedListIdx: number = 0;
  
  constructor(
    private sharedDataService: SharedDataService, 
    private taskListService: TaskListService 
    ){
  }
  
  ngOnInit(): void {
    this.taskListService.GetLists().subscribe(res => {
      this.lists = res;
      const firstList = this.lists[0];
      if(firstList === null || firstList === undefined) return;
      this.sharedDataService.setListId(firstList.id);
    })
  }
  
  onSubmit(form: NgForm){
    this.taskListService.AddList(form.value.title).subscribe(res => {
      this.lists = [...this.lists, res];
      form.reset();
    })
  }

  onListSelect(listIdx: number){
    let list = this.lists[listIdx];
    this.sharedDataService.setListId(list.id);
    this.selectedListIdx = listIdx;
  }

  getListStyle(listIdx: number) :string {
    return listIdx === this.selectedListIdx ? "selected" : "";
  }
}
