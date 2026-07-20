# Task-Manager

Welcome to Task-Manager! This is a Vanilla JavaScript task management app with search and filter functionality, using LocalStorage to persist tasks in the browser.

## Live URL : https://rajesh-ranjan-git.github.io/Task-Manager/

```bash
https://rajesh-ranjan-git.github.io/Task-Manager/
```

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation Guide](#installation-guide)
- [Usage Instructions](#usage-instructions)
- [Author](#author)

## Project Overview

Task-Manager is a client-side task management app. Tasks are created, searched, and filtered directly in the browser, with all data persisted locally via the browser's LocalStorage — no backend required.

## Features

- **Task Management:** Add and manage tasks in the browser.
- **Search Functionality:** Search through existing tasks.
- **Filter Functionality:** Filter tasks based on criteria.
- **Local Persistence:** Tasks are stored in LocalStorage, so they persist across page reloads.

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Storage:** Browser LocalStorage

## Folder Structure

```bash
Task-Manager/
├── assets/      # Static assets used by the app
├── index.html   # Main page markup
├── style.css    # Page styling
├── script.js    # Task logic, search/filter, and LocalStorage handling
└── bugs.txt     # Known issues / notes tracked by the author
```

## Installation Guide

### Prerequisites

- A modern web browser
- (Optional) A local static server such as VS Code's "Live Server" extension

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/rajesh-ranjan-git/Task-Manager.git
   cd Task-Manager
   ```

2. Open `index.html` directly in your browser, or serve the folder with a local static server:

   ```bash
   npx serve .
   ```

## Usage Instructions

1. Add a new task using the input field.
2. Use the search bar to find specific tasks.
3. Use the filter controls to narrow down the task list.
4. Tasks remain saved in your browser between visits.

## Author

- **Rajesh Ranjan** — [GitHub @rajesh-ranjan-git](https://github.com/rajesh-ranjan-git)

---
