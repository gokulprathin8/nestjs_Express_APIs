import { Injectable } from '@nestjs/common';
import { TaskStatus } from './tasks.model';
import { Task } from './tasks.model';

import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [
        
    ];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id == id);
    }

    getTasksWithFilters(filterDto: GetTasksFilterDTO){
        const { status, search } = filterDto

        let tasks = this.getAllTasks();
        if (status) {
            // tasks = tasks.filter
        }
    }

    createTask(createTaskDTO: CreateTaskDTO): Task {

        const {title, description} = createTaskDTO;

        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaskStatus.OPEN
        };
        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => task.id != id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
