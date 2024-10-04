# Employee Management System

## Description
This Employee Management System is a web-based application built with React for the frontend and Node.js with Express for the backend. It uses Firebase for authentication and as a database. The system allows for managing employee records, including adding new employees, updating existing records, and moving employees to a former employees list.

## Features
- User authentication using Firebase
- Add new employees
- View all current employees
- Update employee information
- Move employees to former employees list
- View former employees list

## Technologies Used
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: Firebase Firestore
- Authentication: Firebase Authentication

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js and npm installed
- Firebase account and project set up

## Installation

### Backend Setup
1. Clone the repository:
   ```
   git clone https://github.com/ComfortN/employee-registration-node.git
   cd employee-management-system/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your Firebase Admin SDK:
   - Download your Firebase Admin SDK private key JSON file
   - Place it in the `backend` directory
   - Update the path in `firebase/firebase.js` if necessary

4. Start the backend server:
   ```
   node server
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd ../frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Update Firebase configuration:
   - Open `src/firebase/firebase.js`
   - Replace the `firebaseConfig` object with your Firebase project's configuration

4. Start the frontend development server:
   ```
   npm start
   ```

## Usage
1. Open your web browser and go to `http://localhost:5000`
2. Log in using your Firebase authentication credentials
3. Use the interface to manage employees:
   - Add new employees
   - View and edit existing employee information
   - Move employees to the former employees list
   - View the former employees list

