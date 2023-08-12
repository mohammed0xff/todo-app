import { Component, OnInit } from '@angular/core';
import { Task } from '../constants/Task';
import { TaskService } from '../services/TaskService'

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
}
