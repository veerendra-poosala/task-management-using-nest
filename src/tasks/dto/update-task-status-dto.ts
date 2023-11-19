import { IsEnum} from "class-validator";
import { TaskStatus } from "../tasks-status.";


export class updateTaskStatusDto{
    @IsEnum(TaskStatus)
    status: TaskStatus;
}