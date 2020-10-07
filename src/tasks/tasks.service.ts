import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuidv4';
import { v4 } from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }

    createTask(title: string, description: string):Task{
        const task:Task = {
            id: v4(),
            title: title,
            description: description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }
    
}
