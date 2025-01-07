import { Router } from 'express';
import { getTasks, validateCreateTask, createTask, updateTask, deleteTask } from '../handlers/tasks';

const router = Router();

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     description: Get all tasks
 *     responses:
 *       200:
 *         description: success
 */
router.get('/', getTasks);

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     description: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *                 example: "new task title"
 *               completed:
 *                 type: boolean
 *                 description: Whether the task is completed or not
 *                 example: true
 *             required:
 *               - title
 *               - completed
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the created task
 *                 title:
 *                   type: string
 *                   description: The title of the task
 *                 completed:
 *                   type: boolean
 *                   description: The completion status of the task
 *               required:
 *                 - id
 *                 - title
 *                 - completed
 *       400:
 *         description: Bad request (e.g., missing required fields)
 */
router.post('/', validateCreateTask, createTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     description: Update an existing task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *                 example: "new task title"
 *               completed:
 *                 type: boolean
 *                 description: The completion status of the task
 *                 example: true
 *             required:
 *               - title
 *               - completed
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the task
 *                 title:
 *                   type: string
 *                   description: The title of the task
 *                 completed:
 *                   type: boolean
 *                   description: The completion status of the task
 *       404:
 *         description: Task not found
 */
router.put('/:id', validateCreateTask, updateTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     description: Delete a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to be deleted
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete('/:id', deleteTask);

export default router;