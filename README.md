# Capstone-V Backend

This repository contains the backend code for the Capstone-V project, built with Node.js, Express, and MongoDB. It handles user authentication, credential repository management, and user roles and permissions.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**

bash
git clone https://github.com/yourusername/capstone-v-backend.git
cd capstone-v-backend

2. Install dependencies:
   npm install
3. Set up environment variables:
   Create a .env file in the root directory and add the following variables:
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3030

   Replace your_mongodb_connection_string with your actual MongoDB connection string and your_jwt_secret with a secret key for JWT signing.

## Usage

Start the server:
   npm start

# API Endpoints

## Authentication

POST /api/auth/register

Register a new user.

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

POST /api/auth/login

Log in a user.

{
  "email": "john@example.com",
  "password": "password123"
}

# Credential Repositories

POST /api/credential-repositories/

Add a credential to a specific repository (admin only).

{
  "name": "Credential Name",
  "username": "user123"
}

# Users

PUT /api/users/change-role/

Change the role of a user (admin only).

{
  "role": "admin"
}

POST /api/users/assign-division/
/

Assign a user to a division (admin only).

{
  "divisionId": "1234567890abcdef",
  "userId": "0987654321fedcba"
}

## Environment Variables

The following environment variables need to be set in your .env file:

- MONGODB_URI: MongoDB connection string.
- JWT_SECRET: Secret key for JWT signing.
- PORT: Port on which the server runs (default: 3030).


# Contributing
1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.









