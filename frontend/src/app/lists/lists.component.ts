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
  
  length: number = 0; 
  pageIndex: number = 0;
  pageSize: number = 5;
  pageEvent: PageEvent | undefined ;
  
  constructor(
    private sharedDataService: SharedDataService, 
    private taskListService: TaskListService 
    ){
  }
  
  ngOnInit(): void {
    this.paginateLists();
  }
  
  paginateLists(selectedIdx: number = 0){
    this.taskListService.GetLists(this.pageIndex + 1, this.pageSize).subscribe(res => {
      this.lists = res.data;
      this.length = res.totalRecords;
      this.pageIndex = res.pageNumber - 1;
      this.pageSize = res.pageSize;
      this.selectedListIdx = selectedIdx;
      let firstList = this.lists[this.selectedListIdx];
      if(firstList === null || firstList === undefined)
        firstList = {id : -1, title : "" }; 
      this.sharedDataService.setList(firstList);
    })
  }

  onSubmit(form: NgForm){
    this.taskListService.AddList(form.value.title).subscribe(res => {
      // go to last page where the new list just made exists
      this.pageIndex = Math.floor(this.length / this.pageSize ); 
      // the new list will be the result of total number mod page size 
      let selectedIdx = this.length % this.pageSize;
      this.paginateLists(selectedIdx);
      form.reset();
    })
  }

  onListSelect(listIdx: number){
    let list = this.lists[listIdx];
    this.sharedDataService.setList(list);
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

  deleteList(){
    const deleteListId = this.lists[this.selectedListIdx].id;
    
    this.taskListService.DeleteList(deleteListId).subscribe(()=>{
      if(this.selectedListIdx == 0 && this.pageIndex >= 1) {
        // go to prev page, 0 elements left in this page 
        this.pageIndex--;
        this.paginateLists(this.pageSize - 1);
      }else{
        // stay but decrease selected list idx by 1
        let listIdx = this.selectedListIdx == 0 ? 
          0 : this.selectedListIdx - 1;
        this.paginateLists(listIdx);
      }
    });
  }
  
}
