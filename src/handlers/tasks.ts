import { Request, Response } from 'express';
import { CreateTaskDto } from '../dtos/task/CreateTask.dto';
import { UpdateTaskDto } from '../dtos/task/UpdateTask.dto';
import { Task } from '../interfaces/Task';
import { body, validationResult, ValidationError } from 'express-validator';


const tasks: Task[] = [
  { id: 1, title: 'First task', completed: true },
  { id: 2, title: 'Second task', completed: false },
  { id: 3, title: 'Third task', completed: true },
];

export function getTasks(req: Request, res: Response<{ status: string; data: Task[] }>): void {
  res.status(201).json({
    status: 'success',
    data: tasks,
  });
}

export const validateCreateTask = [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .notEmpty()
    .withMessage('Title is required'),
  body('completed')
    .isBoolean()
    .withMessage('Completed must be a boolean')
    .notEmpty()
    .withMessage('Completed is required'),
];

export function createTask(
  req: Request<{}, {}, CreateTaskDto>,
  res: Response<{ status: string; data?: Task; message?: ValidationError [] | string[]}>
): void {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 'error',
      message: errors.array(),
    });
  }

  const { title, completed } = req.body;

  const newTask: Task = {
    id: tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1,
    title,
    completed,
  };
  tasks.push(newTask);

  res.status(201).json({
    status: 'success',
    data: newTask,
  });
}

export function updateTask(
  req: Request<{ id: string }, {}, UpdateTaskDto>,
  res: Response<{ status: string; data?: Task; message?: ValidationError[] | string[] }>
): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 'error',
      message: errors.array(),
    });
  }

  const { id } = req.params;
  const { title, completed } = req.body;

  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  if (taskIndex === -1) {
    res.status(404).json({
      status: 'error',
      message: [`Task with id ${id} not found`],
    });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], title, completed };

  res.status(201).json({
    status: 'success',
    data: tasks[taskIndex],
  });
}

export function deleteTask(
  req: Request<{ id: string }, {}, {}>,
  res: Response<{
    status: string;
    message?: ValidationError[] | string[];
  }>
): void {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  if (taskIndex === -1) {
    res.status(404).json({
      status: 'error',
      message: [`Task with id ${id} not found`],
    });
  }

  tasks.splice(taskIndex, 1);

  res.status(200).json({
    status: 'success',
    message: [`Task with ID ${id} deleted.`],
  });
}