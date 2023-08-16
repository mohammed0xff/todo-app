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
  
  length :number = 0; 
  pageIndex :number = 0;
  pageSize :number = 5;
  pageEvent: PageEvent | undefined ;
  
  constructor(
    private sharedDataService: SharedDataService, 
    private taskListService: TaskListService 
    ){
  }
  
  ngOnInit(): void {
    this.paginateLists();
  }
  
  paginateLists(){
    this.taskListService.GetLists(this.pageIndex + 1, this.pageSize).subscribe(res => {
      this.lists = res.data;
      this.length = res.totalRecords;
      this.pageIndex = res.pageNumber - 1;
      this.pageSize = res.pageSize;
      
      const firstList = this.lists[0];
      if(firstList === null || firstList === undefined) return;
      this.sharedDataService.setListId(firstList.id);
    })
  }

  onSubmit(form: NgForm){
    this.taskListService.AddList(form.value.title).subscribe(res => {
      // go to last page where the new list just made exists
      this.pageIndex = Math.floor(this.length / this.pageSize ); 
      this.paginateLists();
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

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.paginateLists();
  }

}
