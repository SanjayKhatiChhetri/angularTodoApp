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

This structure reflects the current state of Angular Todo app project, including:

1. The `src/app/components` directory containing all Angular components.
2. The `src/app/guards` and `src/app/interceptors` directories for authentication-related functionality.
3. The `src/app/services` directory for auth and todo services.
4. The new `src/app/offline-indicator` directory for the offline indicator component.
5. Configuration files like `.env`, `angular.json`, and `ngsw-config.json` for Progressive Web App (PWA) setup.
6. The `backend` directory structure for backend, including controllers, models, routes, and middleware.

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

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Angular team for the excellent framework
- Angular Material for the UI components
- The open-source community for inspiration and resources
