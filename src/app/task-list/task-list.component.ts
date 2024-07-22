import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';
export interface Task {
  id: string;
  name: string;
  status: string;
  createdDate: string;
  modifiedDate: string;
  editing?: boolean; // Flag to indicate if row is in edit mode
}
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchPipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  searchText: string = '';
  tasks: any[] = [];
  ngOnInit() {
    // Check if 'tasks' exists in localStorage
    const storedTasks = localStorage.getItem('tasks');

    // Parse the JSON data if it exists and is not null
    if (storedTasks !== null) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  constructor() {}
  // add new task button click
  addNewTask() {
    this.tasks.push({
      id: Math.floor(Math.random() * 10).toString(),
      name: ' ',
      status: 'open',
      createdDate: this.changeFormat(new Date().toISOString()),
      modifiedDate: '',
      editing: true,
    });
    // this.updateLocalStorage();
  }
  // edit button click
  editTask(task: Task): void {
    task.editing = true;
  }
  // save button click
  saveTask(task: Task): void {
    task.editing = false;
    (task.modifiedDate = this.changeFormat(new Date().toISOString())),
      this.updateLocalStorage();
  }
  // cancel button click
  cancelEdit(task: Task): void {
    task.editing = false;
  }
  // delete button click
  deleteTask(task: Task): void {
    debugger;
    task.editing = false;
    this.tasks = this.tasks.filter((ele) => ele.id !== task.id);
    this.updateLocalStorage();
  }
  // update local storage
  private updateLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  // change date format
  changeFormat(isoDateString: any) {
    const date = new Date(isoDateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
    return formattedDate;
  }
}
