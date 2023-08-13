import { Component, OnInit } from '@angular/core';
import { Task } from '../constants/Task';
import { TaskService } from '../services/TaskService'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})

export class TasklistComponent implements OnInit {
  
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.GetTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onCheck(index: number) {
    const taskId = this.tasks[index].id;
    this.taskService.ToggleCompleted(taskId).subscribe(() => {
      this.tasks[index].isCompleted = !this.tasks[index].isCompleted;
    });
  }
  
  onDelete(index: number) {
    const taskId = this.tasks[index].id;
    this.taskService.DeleteTask(taskId).subscribe(() => {
      this.tasks.splice(index, 1);
    });
  }
  
  onSubmit(form: NgForm) {
    console.log(form.value.description);
    this.taskService.AddTask(form.value.description).subscribe((res) => {
      this.tasks.push(res);
      form.reset();
    });
  }
}
