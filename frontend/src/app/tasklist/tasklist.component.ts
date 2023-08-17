import { Component, OnInit } from '@angular/core';
import { Task } from '../constants/Task';
import { TaskService } from '../services/TaskService';
import { NgForm } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SharedDataService  } from '../services/SharedDataService';
import { Subscription } from 'rxjs';
import { TaskList } from '../constants/TaskList';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
})
export class TasklistComponent implements OnInit {
  
  tasks: Task[] = [];
  list: TaskList = {id : 0, title : ""};
  displayedTasks: Task[] = [];
  filterType: string = "all";
  displayedColumns: string[] = ['isCompleted', 'description', 'createdAt', 'remove'];
  private subscription: Subscription;
  
  constructor(
    private taskService: TaskService, 
    private sharedDataService: SharedDataService) {
    this.subscription = this.sharedDataService.list$.subscribe(list => {
      this.list = list;
      if(list.id == -1) return;
      this.taskService.GetTasks(this.list.id).subscribe((tasks) => {
        this.tasks = tasks;
        this.filterTasks(this.filterType);
      });
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCheck(task: Task) {
    const taskId = task.id;
    this.taskService.ToggleCompleted(taskId).subscribe(() => {
      task.isCompleted = !task.isCompleted;
      this.filterTasks(this.filterType);
    });
    this.tasks.forEach(t => {
      console.log(t.isCompleted)
    });
  }

  onDelete(task: Task) {
    const taskId = task.id;
    this.taskService.DeleteTask(taskId).subscribe(() => {
      // remove task from task array 
      this.tasks = this.tasks.filter((t) => t.id !== taskId);
      this.filterTasks(this.filterType);
    });
  }

  onSubmit(form: NgForm) {
    if(this.list.id == -1) return;
    
    this.taskService.AddTask(this.list.id, form.value.description).subscribe((res) => {
    // this.tasks.push(res); // doesnt work -component does not re render-
    
    // figured out that we have to change the value of 
    // a memeber object to cuase the component to re render
    this.tasks = [...this.tasks, res]; // works fine
    // if you see any better approach please let me know.
    
    this.filterTasks(this.filterType);
    form.reset();
    });
  }

  OnDrop(event: CdkDragDrop<string[]>) {
    console.log(event.previousIndex, event.currentIndex);
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.tasks = [...this.tasks];
    this.filterTasks(this.filterType);
  }
  
  filterTasks(filterType: string) {
    this.filterType = filterType;
    switch(filterType){
      case 'all' :
        this.displayedTasks = this.tasks; 
        break;
      case 'complete':
        this.displayedTasks = this.tasks.filter((task) => task.isCompleted);
        break;
      case 'incomplete':
        this.displayedTasks = this.tasks.filter((task) => !task.isCompleted); 
        break;
    } 
  }

  getButtonStyle(filter:string){
    return this.filterType === filter ? 'btn-primary' : 'btn-secondary'
  }
}