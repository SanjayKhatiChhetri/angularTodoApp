# Angular Todo App

A feature-rich, responsive Todo application built with Angular 18, showcasing modern web development practices including user authentication, pwa(mobile/desktop installable) and CRUD operations for task management.

Live Demo: [TODOAPP](https://angular-todo-app-six.vercel.app/)

## Features

- User Authentication (Register, Login, Logout)
- Create, Read, Update, and Delete Todos
- Task status management (Open, In Progress, Testing, Done)
- Password strength indicator
- Responsive design for mobile and desktop
- Angular Material UI components
- Progressive Web App (PWA) capabilities

## Technologies Used

- Frontend:
  - Angular 18
  - TypeScript
  - RxJS
  - Angular Material
  - Progressive Web App (PWA)
- Backend:
  - Node.js
  - Express
  - PostgreSQL
  - Sequelize ORM
- Authentication:
  - JWT (JSON Web Tokens)
- Deployment:
  - Frontend: Vercel.
  - Backend: Heroku.
  - Database: neon.tech.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v8 or later)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. Clone the repository: `git clone https://github.com/your-username/angular-todo-app.git
cd angular-todo-app`

2. Install dependencies: `npm install`'

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

```env
DB_PORT=5432
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
```

4. Start the development server: `ng serve`

5. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
angular-todo-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/
│   │   │   ├── nav/
│   │   │   ├── password-strength/
│   │   │   ├── register/
│   │   │   ├── todo-create-modal/
│   │   │   ├── todo-edit-modal/
│   │   │   ├── todo-form/
│   │   │   ├── todo-item/
│   │   │   └── todo-list/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── offline-indicator/
│   │   ├── services/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── environments/
│   ├── assets/
│   └── styles.css
└── (configuration files)

├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
```

## Key Components

- `LoginComponent` & `RegisterComponent`: Handle user authentication
- `TodoListComponent`: Displays and manages the list of todos
- `TodoItemComponent`: Represents individual todo items
- `TodoFormComponent`: Allows creation of new todos
- `TodoEditModalComponent`: Modal for editing existing todos
- `OfflineIndicatorComponent`: Indicates when the app is offline

## Services

- `AuthService`: Manages authentication state and API calls
- `TodoService`: Handles CRUD operations for todos

## Backend API

The backend is built with Node.js, Express, and PostgreSQL, providing RESTful endpoints for todo and user management.

## Deployment

- Frontend: Deployed on Vercel
- Backend: Deployed on Heroku
- Database: Hosted on neon.tech

## Architecture

```
+-------------------+
|    Client Side    |
+-------------------+
|                   |
|  React Frontend   |
|                   |
|  +-------------+  |
|  |  Components |  |
|  +-------------+  |
|  | - Auth      |  |
|  | - ListHeader|  |
|  | - ListItem  |  |
|  | - Modal     |  |
|  | - ProgressBar |
|  +-------------+  |
|         |         |
|         | HTTP/HTTPS
|         |         |
+-------------------+
          |
          |
+-------------------+
|    Server Side    |
+-------------------+
|                   |
|  Express Backend  |
|                   |
|  +-------------+  |
|  |   Routes    |  |
|  +-------------+  |
|  | - /todos    |  |
|  | - /signup   |  |
|  | - /login    |  |
|  +-------------+  |
|         |         |
|         | SQL Queries
|         |         |
+-------------------+
          |
          |
+-------------------+
|     Database      |
+-------------------+
|                   |
|   PostgreSQL DB   |
|                   |
|  +-------------+  |
|  |   Tables    |  |
|  +-------------+  |
|  | - todos     |  |
|  | - users     |  |
|  +-------------+  |
|                   |
+-------------------+
```

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please [open a issue](https://github.com/SanjayKhatiChhetri/angularTodoApp/issues) or submit a [Pull Request](https://github.com/SanjayKhatiChhetri/angularTodoApp/pulls).

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/SanjayKhatiChhetri/angularTodoApp/blob/main/LICENSE) file for details. Contact If you have any questions or inquiries, please contact Sanjay Khati Chhetri, social can be found at [Github Profile](https://github.com/SanjayKhatiChhetri) under Where to find me section.

## Acknowledgments

- Angular team for the excellent framework
- Angular Material for the UI components
- The open-source community for inspiration and resources
