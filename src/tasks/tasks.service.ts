import { Injectable, NotFoundException, Param } from '@nestjs/common';
import {  TaskStatus } from './tasks-status.';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
      ) {}

    
    async getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;

        const query = this.tasksRepository.createQueryBuilder('task');

        if (status) {
        query.andWhere('task.status = :status', { status });
        }

        if (search) {
        query.andWhere(
            'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
            { search: `%${search}%` },
        );
        }

        const tasks = await query.getMany();
        return tasks;
        
      }

    async createTask(createTaskDto: CreateTaskDto) : Promise<Task>{

        const { title, description } = createTaskDto;

        const task = this.tasksRepository.create({
        title,
        description,
        status: TaskStatus.OPEN,
        });

        await this.tasksRepository.save(task);
        return task;
        
    }

   async getTaskById(id:string): Promise<Task>{
        const found = await this.tasksRepository.findOneBy({id:id});

        if(!found){
            throw new NotFoundException(`Task with ID ${id} not found.`);
        }

        return found;
    }

    

    async deleteTaskById(id:string): Promise<void>{
        
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
          }

    }

    async updateTaskStatusById(id:string,status: TaskStatus): Promise<Task>{
        
        const task = await this.getTaskById(id);
        task.status = status;
        await this.tasksRepository.save(task);
        return task;

    }

    // getTasksWithFilters(filterDto: GetTasksFilterDto) : Task[]{
    //     const {status, search} = filterDto;
    //     let tasks: Task[] = this.getAllTasks();

    //     if(status){
    //         tasks = tasks.filter((task:Task)=>task.status === status);
    //     }
    //     if(search && search !== ''){
    //         tasks = tasks.filter((task: Task)=>{
    //             if(task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || task.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
    //                 return true;
    //             }
    //             return false;
    //         })
    //     }

    //     return tasks;
    // }

   
}
