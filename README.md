# Task Manager API

RESTful API built with TypeScript and Express for managing tasks.

## How to Start the Server

### Development Mode
To run the server in development mode using `ts-node`, follow these steps:

1. Ensure you are in the project directory.
2. Copy `.env.example` file and rename it into `.env`.
3. Run the following command:
```bash
   pnpm run start
```

And if you want to run it in watch mode with nodemon, follow these steps:

1. Ensure you are in the project directory.
2. Copy `.env.example` file and rename it into `.env`.
3. Run the following command:
```bash
   pnpm run dev
```
The server will start on http://localhost:3000.

### Testing

Run SWAGGER testing environment to test the api, accessing the following path http://localhost:3000/swagger.

<img width="1478" alt="Screenshot 2025-01-06 at 9 57 08 PM" src="https://github.com/user-attachments/assets/6a945c79-c965-4daa-ba12-3b292e540fde" />
<img width="1507" alt="Screenshot 2025-01-06 at 9 57 00 PM" src="https://github.com/user-attachments/assets/a3125c76-0dda-4f85-9754-9aad3c20df99" />


### Production Mode

To run the server in production mode (compiled JavaScript), follow these steps:
1.	Compile the TypeScript code into JavaScript:
```bash
  pnpm run build
```

2.	Start the server using Node.js:
```bash
  pnpm run prod
```

The server will start on http://localhost:3000.

