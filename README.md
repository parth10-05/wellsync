# WellSync: AI Wellness Companion

WellSync is a holistic health management system that helps track, analyze, and optimize all aspects of personal wellbeing including nutrition, fitness, mental health, sleep, and productivity in one unified platform.

## Features

- **Unified Dashboard**: Comprehensive view of all health metrics in one place
- **Fitness Tracking**: Monitor workouts, steps, and physical activities
- **Nutrition Monitoring**: Track meals, calories, and macronutrients
- **Sleep Analysis**: Track sleep patterns and quality
- **Mental Wellness**: Monitor mood, stress levels, and mindfulness practices
- **AI-Powered Insights**: Get personalized recommendations based on your data
- **Multi-Agent System**: Specialized health domains working together

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **State Management**: React Context API
- **Authentication**: JWT-based auth with secure storage
- **API Integration**: Axios
- **Data Visualization**: Custom chart components

## Local Setup

1. Clone the repository and navigate to the project directory
   ```bash
   git clone https://github.com/yourusername/wellsync.git
   cd wellsync
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Application Structure

```
wellsync/
├── pages/                # Next.js pages
│   ├── index.tsx         # Dashboard
│   ├── fitness.tsx       # Fitness tracking
│   ├── nutrition.tsx     # Nutrition tracking  
│   ├── sleep.tsx         # Sleep tracking
│   ├── mental.tsx        # Mental wellness
│   ├── profile.tsx       # User profile
│   ├── login.tsx         # Login page
│   ├── register.tsx      # Registration page
│   └── api/              # API routes
│       └── auth/         # Authentication endpoints
├── components/           # Reusable UI components
│   ├── layout/           # Layout components
│   ├── metrics/          # Metric visualization components
│   └── auth/             # Authentication components
├── context/              # React context providers
│   └── AuthContext.tsx   # Authentication context
├── services/             # API services
├── types/                # TypeScript type definitions
└── styles/               # Global styles
```

## Authentication

The application uses JWT-based authentication with secure local storage. The authentication flow includes:

1. User registration with email/password
2. User login with credentials
3. Secure token storage
4. Protected routes using the ProtectedRoute component
5. Automatic redirection to login for unauthenticated users

## Pages

### Dashboard

The dashboard provides an overview of the user's wellness metrics across all domains, including:
- Fitness stats (steps, active minutes)
- Nutrition data (calories, water intake)
- Sleep metrics (duration, quality)
- Mental wellness indicators (mood, stress levels)
- Recent activity history

### Fitness Tracking

The fitness page allows users to:
- View workout statistics
- Track daily activities
- Monitor exercise progress
- Schedule new workouts

### Nutrition Tracking

The nutrition page enables users to:
- Log meals and food intake
- Track calories and macronutrients
- Monitor water consumption
- View nutritional recommendations

### Sleep Tracking

The sleep page offers:
- Sleep duration and quality metrics
- Sleep stage analysis
- Sleep trend visualization
- Personalized sleep recommendations

### Mental Wellness

The mental wellness page provides:
- Mood tracking and analysis
- Stress level monitoring
- Wellness practice suggestions
- Guided meditation resources

## Development Notes

### Authentication

- The application uses a simulated JWT-based authentication system
- API routes in `/pages/api/auth/` handle login and registration
- The AuthContext provider manages user state and token storage
- Protected routes are implemented using a custom ProtectedRoute component

### Layout and Navigation

- The application uses a consistent layout with responsive sidebar
- The sidebar collapses on smaller screens
- Active navigation links are highlighted based on current route

### Metrics Visualization

- Custom HealthMetricCard component for consistent metric display
- Progress indicators for tracking goals
- Responsive design for all screen sizes

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [LangChain](https://js.langchain.com/)
- [MongoDB](https://www.mongodb.com/)
- [Pinecone](https://www.pinecone.io/)
