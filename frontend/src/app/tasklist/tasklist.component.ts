import { Component, OnInit } from '@angular/core';
import { Task } from '../constants/Task';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})

export class TasklistComponent implements OnInit {
  
  tasks: Task[] = [{id : 0,  description : "just testing", createdAt : "now", isCompleted : false}];

  constructor() {
  }

  ngOnInit(): void {
  }

  onCheck(index: number) {
  }
}
