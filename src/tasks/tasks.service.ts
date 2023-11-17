import { Injectable, NotFoundException, Param } from '@nestjs/common';
import {v4 as uuid} from 'uuid'
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[]{
        return this.tasks;
    }

    getTaskById(id:string): Task{
        const found =this.tasks.find(task=>task.id===id);
        if(!found){
            throw new NotFoundException(`Task with id ${id} not found.`);
        }
        return this.tasks.find(item=>item.id===id);
    }

    deleteTaskById(id:string): void{
        const found=this.getTaskById(id);
        const updateTasks: Task[] = this.tasks.filter(task=>task.id !== id);
        this.tasks = updateTasks;
    }

    updateTaskStatusById(id:string,status: TaskStatus): Task{
        
        const task:Task = this.getTaskById(id);
        task.status = status;
        return task;

    }

    getTasksWithFilters(filterDto: GetTasksFilterDto) : Task[]{
        const {status, search} = filterDto;
        let tasks: Task[] = this.getAllTasks();

        if(status){
            tasks = tasks.filter((task:Task)=>task.status === status);
        }
        if(search && search !== ''){
            tasks = tasks.filter((task: Task)=>{
                if(task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || task.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                    return true;
                }
                return false;
            })
        }

        return tasks;
    }

    createTask(createTaskDto: CreateTaskDto) : Task{
        const {
            title,
            description
        } = createTaskDto
        const task:Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }
}
