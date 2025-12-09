# FitStack Backend API

Node.js Express backend API for the FitStack fitness tracker application.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitstack?retryWrites=true&w=majority
PORT=5000
FRONTEND_URL=http://localhost:3000
```

Replace:
- `username` with your MongoDB Atlas database username
- `password` with your MongoDB Atlas database password
- `cluster.mongodb.net` with your actual cluster URL

### 3. Start the Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if API is running

### Workouts
- `GET /api/workouts` - Get all user workouts
- `POST /api/workouts` - Create a new workout
- `GET /api/workouts/:id` - Get a specific workout
- `PUT /api/workouts/:id` - Update a workout
- `DELETE /api/workouts/:id` - Delete a workout

### Exercises
- `GET /api/exercises` - Get exercise library (with optional query params: category, difficulty, search)
- `GET /api/exercises/:id` - Get a specific exercise
- `POST /api/exercises` - Create a custom exercise
- `PUT /api/exercises/:id` - Update an exercise
- `DELETE /api/exercises/:id` - Delete an exercise

### Progress
- `GET /api/progress` - Get user progress entries
- `GET /api/progress/stats` - Get aggregated statistics
- `POST /api/progress` - Create a progress entry
- `PUT /api/progress/:id` - Update a progress entry

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/stats` - Get user statistics

## Authentication

All protected endpoints require authentication headers:
- `x-user-id`: Supabase user ID
- `x-user-email`: User email

These headers are automatically set by the frontend API service when a user is logged in.

## Database Models

- **User**: User profile data linked to Supabase auth
- **Workout**: Workout sessions with exercises
- **Exercise**: Exercise library (public + custom)
- **Progress**: Daily progress tracking data

