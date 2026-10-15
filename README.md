# Task & Engagement Management Tool

A full-stack application designed to help service teams manage clients, service engagements, tasks, assignments, and task progress.

## Overview

The Task & Engagement Management Tool aims to organize service-related work in one place. It is being developed to support different user roles, task assignments, deadlines, progress tracking, and review workflows.

## Tech Stack

- **Frontend:** React.js, JavaScript, HTML5, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **API Testing:** Postman
- **Version Control:** Git and GitHub

## Features

- Backend API built using Express.js.
- MySQL database connection.
- Relational database structure for users, clients, service types, engagements, tasks, and task history.
- Task creation API with input validation.
- Database relationship checks for engagements and task creators.
- API success and error scenarios tested using Postman.

## User Roles

The application is being developed around three roles:

- **Admin:** Manages users, clients, service types, and task templates.
- **Manager:** Manages engagements, assigns tasks, and reviews submitted work.
- **Team Member:** Views assigned tasks, updates progress, and submits work for review.

## Task Workflow

The planned workflow includes:

`NOT_STARTED → IN_PROGRESS → READY_FOR_REVIEW → COMPLETED`

Additional statuses will support waiting for client information and requesting changes.

## Project Structure

The project includes a React frontend and a Node.js/Express backend, with MySQL used for persistent data storage.

## Getting Started

### Prerequisites

- Node.js and npm
- MySQL Server
- Git
- Postman (for API testing)

### Setup

1. Clone this repository.
2. Install the server dependencies.
3. Configure the database and environment variables.
4. Create the required database tables.
5. Start the backend server.
6. Start the frontend application once frontend setup is complete.

Refer to the project's configuration files and `package.json` for the exact commands and settings.

## Development Plan

The project is being developed incrementally, with a focus on:

- REST API implementation and validation.
- Role-based authorization and task management.
- Task assignment and review workflows.
- Automated backend testing.
- React frontend integration.
- Error handling, security, and documentation.

## Author

**M. Ahmedi**

- GitHub: [munshiahmedi](https://github.com/munshiahmedi)
- LinkedIn: [M. Ahmedi](https://www.linkedin.com/in/m-ahmedi-80baab269/)
- Portfolio: [Visit Portfolio](https://munshiahmedi.github.io/portfolio)
