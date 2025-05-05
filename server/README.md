# EcoLens Server Documentation

## Overview
EcoLens is an AI-powered application designed to assist users in properly classifying and disposing of waste. The server component of EcoLens handles user authentication, waste logging, and AI model interactions.

## Features
- **User Authentication**: Secure login and registration for users.
- **Waste Management**: Log and classify waste items scanned by users.
- **AI Integration**: Utilize machine learning models for real-time waste classification.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node package manager)
- MongoDB (or any other database of choice)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/Phantasm0009/ecolens.git
   ```
2. Navigate to the server directory:
   ```
   cd ecolens/server
   ```
3. Install dependencies:
   ```
   npm install
   ```

### Running the Server
To start the server, run:
```
npm start
```
The server will be available at `http://localhost:5000`.

### API Endpoints
- **Authentication**
  - `POST /api/auth/login`: Log in a user.
  - `POST /api/auth/register`: Register a new user.

- **User Management**
  - `GET /api/users/:id`: Get user profile information.
  - `PUT /api/users/:id`: Update user profile information.

- **Waste Management**
  - `POST /api/waste/log`: Log a new waste item.
  - `GET /api/waste/:id`: Get details of a specific waste log.

## AI Model
The AI model for waste classification is located in the `ai` directory. It includes:
- `model.py`: Defines and trains the AI model.
- `preprocess.py`: Contains functions for preprocessing images.
- `predict.js`: Functions for making predictions with the trained model.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
