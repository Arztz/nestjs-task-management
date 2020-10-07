import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuidv4';
import { v4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }

    getTaskById(id:string):Task{
        return this.tasks.find(task => task.id === id );
    }

    createTask(createTaskDto: CreateTaskDto):Task{
        const {title, description} = createTaskDto;
        const task:Task = {
            id: v4(),
            title: title,
            description: description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    deleteTaskById(id:string){
         this.tasks = this.tasks.filter(task => task.id !== id);
    }
    
}
