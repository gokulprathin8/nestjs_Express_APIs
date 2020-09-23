import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './tasks.entity';
import { TaskStatus } from './tasks-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { create } from 'domain';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController');
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetTasksFilterDTO,
        @GetUser() user: User
    ) {
        this.logger.verbose(`User "${user.username}" retriveing all tasks. ${JSON.stringify(filterDto)}`)
        return this.tasksService.getTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<Task> {
            return this.tasksService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDTO: CreateTaskDTO,
        @GetUser() user: User, 
    ): Promise<Task>{
        this.logger.verbose(`User "${user.username}" creating a new task. Data: ${JSON.stringify(createTaskDTO)}`)
        return this.tasksService.createTask(createTaskDTO, user);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id:number, @GetUser() user:User): Promise<void> {
        const result = this.tasksService.deleteTask(id, user)
        return result
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id:number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user:User
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status, user)
    }
}
