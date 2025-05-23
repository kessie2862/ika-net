> # IKA-NET                                                                                                    

<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
- [💻 Getting Started](#getting-started)
  - [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Usage](#usage)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [📝 License](#license)

<!-- PROJECT DESCRIPTION -->

> This is a simple Todo App to organize your tasks and set priorities

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://nextjs.org/">Next.js</a></li>
    <li><a href="https://tailwindcss.com/">Tailwind CSS</a></li>
    <li><a href="https://jestjs.io/">Jest</a></li>
  </ul>
</details>

<!-- Features -->

### Key Features <a name="key-features"></a>

- **Drag-and-Drop Reordering: Reorder todos via drag-and-drop with server-synced order updates.**
- **Todo Filtering: Filter todos by "all," "active," or "completed" status.**
- **Modal Editing: View and edit todo details (text, due date, priority) in a modal with form validation.**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

To run this project you need:

- A basic understanding of Git and a code editor(VS Code recommended).
- [Node.js](https://nodejs.org/en) (version 18 or higher)
- npm (version 9 or higher) or yarn

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Setup

Clone this repository to your desired folder:

``` sh
  cd my-folder
  https://github.com/kessie2862/ika-net.git
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Install dependencies

``` sh
cd ika-net
pnpm install or npm install
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#### Set Up the Mock Backend: The application uses JSON Server as a mock backend. Create a db.json file in the root directory with the following structure:

``` sh
  {
    "todos": []
  }
```
#### Run the Mock Backend: Start the JSON Server to simulate the backend API:

``` sh
npm run server or pnpm run server
```
- This will start the server at http://localhost:3001.

#### Run the Development Server: Start the Next.js development server:
``` sh
npm run dev or pnpm run dev
```
- The application will be available at http://localhost:3000.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#### Project Structure

- src/app: Contains the main Next.js pages and layout.
- src/components: React components for the UI (e.g., TodoApp, TodoItem, TodoForm, TodoModal, EditTodoForm).
- src/services: API service layer for Axios-based HTTP requests (todoService.ts).
- src/types: TypeScript type definitions (types.ts).
- __tests__: Unit tests for components and functionality.
- db.json: Mock backend data file for JSON Server.

#### Usage

1. Add a Todo: Enter a todo description, optionally set a due date and priority, and click "Add Todo".
2. View Todos: Todos are displayed in a list, filterable by "All", "Active", or "Completed".
3. Edit a Todo: Click a todo's text to open a modal for viewing or editing, or edit directly from the list.
4. Toggle Completion: Check the checkbox next to a todo to mark it as completed or not.
5. Delete a Todo: Click the trash icon to delete a todo.
6. Reorder Todos: When viewing "All" todos, drag and drop todos to reorder them.

#### Testing

The application includes unit tests for critical functionality:

- TodoItem: Tests rendering, toggling, deleting, and modal opening.
- TodoForm: Tests form rendering and submission with valid data.
- TodoApp: Tests rendering of the todo list with mock data.

To run the tests:
``` sh
pnpm test or npm run test
```

#### Note:
- The backend runs on http://localhost:3001 by default. Kindly ensure this port is free or modify the port in the package.json script.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>

- [ ] **[Search functionality]**
- [ ] **[User authentication]**
- [ ] **[Test API calls with mock responses]**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/kessie2862/ika-net/issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SUPPORT -->

## ⭐️ Show your support <a name="support"></a>

If you like this project, give it a ⭐.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📝 License <a name="license"></a>

This project is [MIT](https://github.com/kessie2862/ika-net/blob/main/LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
