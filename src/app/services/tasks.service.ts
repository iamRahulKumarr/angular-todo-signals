import { Injectable, signal} from '@angular/core';
import { Task } from '../pages/todo/types/Task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService{
  private tasks = signal<Task[]>([]);

  constructor(){
    this.loadTasks();
  }

  private loadTasks(){
    this.tasks.set(JSON.parse(localStorage.getItem('tasks')|| '[]'));
  }
  private saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  getAllTasks(){
    return this.tasks;
  }

  addTask(newTask:Task){
    const taskExists = this.tasks().find(oldTask=> oldTask.id === newTask.id);
    if(!taskExists) this.tasks.update((oldTasks)=> [...oldTasks, newTask]);
    this.saveToLocalStorage();
  }

  getTaskByID(taskId:string):Task | undefined{
    const task = this.tasks().find(task=> task.id === taskId);
    if(task) return task;
    else return undefined;
  }

  updateTask(updatedTask:Task){
    this.tasks.update((oldTasks)=> oldTasks.map(task=>{
      if(task.id === updatedTask.id){
          task = updatedTask; 
        }
        return task 
      }))

      this.saveToLocalStorage();
  }

  deleteTaskById(taskId: string){
    this.tasks.update((oldTasks)=> oldTasks.filter(task=> task.id !== taskId));
    this.saveToLocalStorage();
  }


}
