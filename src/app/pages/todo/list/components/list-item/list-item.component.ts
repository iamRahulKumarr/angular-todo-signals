import { Component, inject, input } from '@angular/core';
import { Task } from '../../../types/Task.model';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { Router } from '@angular/router';
import { TasksService } from '../../../../../services/tasks.service';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CheckboxComponent],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  router = inject(Router);

  private tasksService = inject(TasksService);
  task = input.required<Task>();

  completeTaskHandler() {
    if (this.task() && this.task().id) {
      this.task().isComplete = !this.task().isComplete;
      this.tasksService.updateTask(this.task());
    }

  }
  readMore() {
    if (this.task && this.task().id) {
      this.router.navigateByUrl(`/${this.task().id}`);
    }
  }
  deleteTask() {
    this.tasksService.deleteTaskById(this.task().id);
  }
}
