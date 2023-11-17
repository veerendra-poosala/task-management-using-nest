import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { updateTaskStatusDto } from './dto/update-task-status-dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(
        @Query() filterDto: GetTasksFilterDto
    ): Task[] {
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        }else{
        return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string): Task{
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string): void{
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatusById(
        @Param('id') id:string, 
        @Body() updateTaskStatusDto: updateTaskStatusDto,
        ): Task{
            const {status} = updateTaskStatusDto
        return this.tasksService.updateTaskStatusById(id,status);
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Task {

        return this.tasksService.createTask(createTaskDto);
    }

}
