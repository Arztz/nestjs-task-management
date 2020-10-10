import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm';


import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {

    }

    // private tasks: Task[] = [];

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    // getAllTasks(): Task[]{
    //     return this.tasks;
    // }

    // getTaskWithFilters(filterDto:GetTasksFilterDto): Task[]{
    //     const {status,search} = filterDto;

    //     let tasks = this.getAllTasks();

    //     if(status){
    //         tasks = tasks.filter(task => task.status === status);
    //     }
    //     if(search)
    //     {
    //         tasks = tasks.filter(task => 
    //             task.title.includes(search) || 
    //             task.description.includes(search)
    //         );
    //     }
    //     return tasks;
    // }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }
    // getTaskById(id:string):Task{
    //     const found = this.tasks.find(task => task.id === id );

    //     if(!found){
    //         throw new NotFoundException(`Task with ID "${id}" not found`);
    //     }

    //     return found;
    // }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }
    // createTask(createTaskDto: CreateTaskDto):Task{
    //     const {title, description} = createTaskDto;
    //     const task:Task = {
    //         id: v4(),
    //         title: title,
    //         description: description,
    //         status: TaskStatus.OPEN,
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }

    async deleteTaskById(id: number): Promise<void> {
        const result = (await this.getTaskById(id)).remove();
        if (!result) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        console.log(result);
    }
    // this.tasks = this.tasks.filter(task => task.id !== found.id);

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const found = await this.getTaskById(id);
        found.status = status;
        found.save();
        return found;
    }
    // updateTaskStatus(id:string,status: TaskStatus): Task{
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

}
