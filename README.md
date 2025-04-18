# Second Brain

A personal knowledge management system designed to help you organize thoughts, notes, and information in a structured and accessible way.

## Overview

Second Brain is a digital framework that allows you to capture, organize, and retrieve information efficiently. Inspired by the concept of building a "second brain" outside your physical one, this repository serves as a template and guide for creating your own knowledge management system.

## Features

- **Seamless Note-Taking**: Capture ideas, concepts, and information quickly
- **Organized Structure**: Categorize notes using a flexible hierarchy
- **Cross-Referencing**: Connect related ideas across different categories
- **Search Functionality**: Find information quickly when you need it
- **Knowledge Synthesis**: Combine ideas to generate new insights

## Technologies Used

### Backend

- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- Zod for schema validation
- dotenv for environment variable management

### Frontend

- React with TypeScript
- Vite as build tool and development server
- Tailwind CSS for styling
- React Router for routing
- Recoil for state management
- Axios for HTTP requests

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm (comes with Node.js)
- MongoDB instance (local or cloud)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory and add necessary environment variables, for example:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Build the backend TypeScript code:
```bash
npm run build
```

5. Start the backend server:
```bash
npm start
```

Alternatively, you can run the backend in one step (build and start):
```bash
npm run dev
```

The backend server will run on the port specified in your `.env` file (default 5000).

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

This will start the frontend on a local development server (usually http://localhost:5173).

4. To build the frontend for production:
```bash
npm run build
```

5. To preview the production build locally:
```bash
npm run preview
```

## Folder Structure

- `backend/`: Backend source code, including controllers, routes, models, and middleware
- `frontend/`: Frontend React application source code, components, pages, and assets
- `README.md`: Project overview and setup instructions
- `netlify.toml`: Configuration for Netlify deployment (if applicable)

## Usage

This project serves as a personal knowledge management system where you can capture, organize, and retrieve notes and information efficiently. Use the frontend interface to interact with your data, and the backend handles data storage and authentication.

## Contributing

Contributions to improve the Second Brain framework are welcome. Please feel free to submit a pull request or open an issue to discuss potential improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Tiago Forte's Building a Second Brain methodology
- Thanks to the knowledge management community for continuous insights and improvements
