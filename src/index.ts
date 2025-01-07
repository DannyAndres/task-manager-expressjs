import express from "express";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from './../package.json';

import tasksRouter from "./routes/tasks";

const app = express();
const PORT = process.env.PORT || 3000;
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: process.env.API_TITLE || 'Task Manager API',
      version,
      description: process.env.API_DESCRIPTION || 'API for managing tasks',
    },
  },
  apis: ['./src/routes/*.ts'],
});


app.use(express.json());
app.use('/api/tasks', tasksRouter);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});