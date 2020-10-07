import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query() filterDto:GetTasksFilterDto): Task[]{
        //console.log(filterDto);
        if(Object.keys(filterDto).length){
            return this.tasksService.getTaskWithFilters(filterDto);
        }else{
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string): Task{
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto ): Task{
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string): void{
        this.tasksService.deleteTaskById(id);
    }

    @Patch(':id/status')
    updateTaskStatus(
        @Param('id') id:string,
        @Body('status') status: TaskStatus,
    ){
        return this.tasksService.updateTaskStatus(id,status);
    }
}
