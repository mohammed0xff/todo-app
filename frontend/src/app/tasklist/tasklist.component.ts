import { Component, OnInit } from '@angular/core';
import { Task } from '../constants/Task';
import { TaskService } from '../services/TaskService';
import { NgForm } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
})
export class TasklistComponent implements OnInit {
  
  tasks: Task[] = [];
  displayedColumns:string[] = ['id', 'description', 'createdAt', 'isCompleted', 'remove'];
  
  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.GetTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onCheck(task: Task) {
    const taskId = task.id;
    this.taskService.ToggleCompleted(taskId).subscribe(() => {
      task.isCompleted = !task.isCompleted;
    });
  }

  onDelete(task: Task) {
    const taskId = task.id;
    this.taskService.DeleteTask(taskId).subscribe(() => {
      // remove task from task array 
      this.tasks = this.tasks.filter((t) => t.id !== taskId);
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value.description);
    this.taskService.AddTask(form.value.description).subscribe((res) => {
    // this.tasks.push(res); // doesnt work -component does not re render-
    
    // figured out that we have to change the value of 
    // a memeber object to cuase the component to re render
    this.tasks = [...this.tasks, res]; // works fine
    
    // if you see any better approach please let me know.
    
    form.reset();
    });
  }

  OnDrop(event: CdkDragDrop<string[]>) {
    console.log(event.previousIndex, event.currentIndex);
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.tasks = [...this.tasks];
  }
}