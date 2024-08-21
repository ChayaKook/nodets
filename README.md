# Tootit - Server

## Description
This is a Node.js TypeScript project following the REST architecture. It includes authorization using JWT tokens, a middleware to handle global errors, a logger, tests, integration with Swagger, and connection to MongoDB. The project serves as a server for business purposes with CRUD operations implemented in the controllers.

## Project Structure
- **tsconfig**: TypeScript configuration file
- **package.json**: Node.js project configuration file
- **package-lock.json**: Lock file for Node.js dependencies
- **log4js**: Logging configuration
- **jest.config.js**: Jest testing framework configuration
- **eslint.config.js**: ESLint configuration for code linting
- **src/**: Source code directory
- **node_modules/**: Node.js dependencies directory
- **logs/**: Directory for log files

## Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up the MongoDB connection in the project.
4. Configure the JWT secret key for authorization.

## Usage
- Run `npm start` to start the server.
- Use Swagger to explore the API endpoints.
- Run tests using `npm test`.

## Endpoints
- **/api/login**: POST endpoint for user login and JWT token generation.
- **/api/resource**: GET endpoint to fetch a resource (example endpoint).
- **/api/auth**: CRUD operations for authentication.
- **/api/orders**: CRUD operations for orders.
- **/api/users**: CRUD operations for users.
- **/api/business**: CRUD operations for business entities.
- **/api/product**: CRUD operations for products.

## Technologies Used
- Node.js
- TypeScript
- JWT for authorization
- Swagger for API documentation
- MongoDB for data storage

## Author
Chaya Krashinski
