import { Component, computed, inject, signal } from '@angular/core';
import { ListItemComponent } from './components/list-item/list-item.component';
import { Router, RouterLink } from '@angular/router';
import { Task } from '../types/Task.model';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ListItemComponent, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  router = inject(Router);
  private tasksService = inject(TasksService);
  private tasks = computed(()=> this.tasksService.getAllTasks());
  allTasks = this.tasks().asReadonly();

  deleteTask(taskID: string) {
    this.tasksService.deleteTaskById(taskID);
  }
}

