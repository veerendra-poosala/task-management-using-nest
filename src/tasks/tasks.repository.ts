import { EntityMetadata, EntityRepository, EntitySchema, Repository } from "typeorm";
import { Task } from "./tasks.entity";


export class TasksRepository extends Repository<Task>{

}