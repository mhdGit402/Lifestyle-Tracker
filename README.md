# Lifestyle Tracker

A web app to help you stay on track, motivated, and maintain healthy lifestyle habits.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running Locally](#running-locally)  
- [Contributing](#contributing)  
- [License](#license)

---

## Features

- Track daily habits or lifestyle goals  
- Motivational UI / reminders (if implemented)  
- Analytics or summary of your activity over time (if available)  
- User-friendly web interface  

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Backend | PHP, Laravel framework |
| Frontend | JavaScript, Tailwind CSS, Vite |
| Database | MySQL (or whatever database specified in `.env`) |
| Testing | PHPUnit |
| Other tools | Composer, NPM |  

---

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

Make sure you have installed:

- PHP (version compatible with your Laravel setup)  
- Composer  
- Node.js + npm or yarn  
- A database server (MySQL / MariaDB / PostgreSQL etc.)  
- Git  

### Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/mhdGit402/Lifestyle-Tracker.git
   cd Lifestyle-Tracker

2. Copy .env.example to .env and set up your environment variables (DB credentials, etc.):
   ```bash
    cp .env.example .env

3. Install backend dependencies with Composer:
    ```bash
    composer install

4. Install frontend dependencies:
    ```bash
    npm install
    # or
    yarn

5. Generate application key (for Laravel):
   ```bash
   php artisan key:generate

6. Set up the database:
   - Create a database in your DB server
   - Run migrations:
     ```bash
     php artisan migrate

### Running Locally

- Start the local development server and watcher:
   ```bash
    php artisan serve
    npm run dev

Then open your browser at http://localhost:8000 (or whatever port Laravel uses) to see the app.

### Contributing
If you’d like to contribute:
1. Fork the repo
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeature
   
3. Make your changes and commit:
    ```bash
    git commit -m "Add some feature"

4. Push your branch:
    ```bash
    git push origin feature/YourFeature

5. Open a Pull Request

### License
This project is licensed under the MIT License

### Contact
Maintained by @mhdGit402
