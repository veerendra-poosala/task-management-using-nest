import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {  TaskStatus } from './tasks-status.';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { updateTaskStatusDto } from './dto/update-task-status-dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './tasks.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTasks(
        @Query() filterDto: GetTasksFilterDto
    ): Promise<Task[]> {
        
        return this.tasksService.getAllTasks(filterDto);
        
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Promise<Task> {

        return this.tasksService.createTask(createTaskDto);
        
    }

     @Get('/:id')
     getTaskById(@Param('id') id:string): Promise<Task>{
         return this.tasksService.getTaskById(id);
     }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string): Promise<void>{
         return this.tasksService.deleteTaskById(id);
         
    }

    @Patch('/:id/status')
    updateTaskStatusById(
        @Param('id') id:string, 
        @Body() updateTaskStatusDto: updateTaskStatusDto,
        ): Promise<Task>{
            const {status} = updateTaskStatusDto
        return this.tasksService.updateTaskStatusById(id,status);
    }

    

}
