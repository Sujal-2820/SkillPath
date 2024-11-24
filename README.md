# Personalized Learning Platform

![Project Banner](img/readme/banner.png)

A personalized learning platform that tailors courses to users based on their skillset preferences and onboarding responses. The application dynamically adjusts module difficulty based on user performance, ensuring a structured and effective learning experience.

---

## Project Owner
   ### Sujal Soni
   ![Project Owner](https://avatars.githubusercontent.com/u/112640952?v=4)

Sujal Soni is a final-year Computer Science Engineering student at Medi-Caps University with a passion for full-stack web development. With hands-on experience in modern technologies like React.js, Next.js, Node.js, MongoDB, and Firebase, Sujal has consistently demonstrated his ability to create scalable and user-centric web applications.

He has successfully delivered impactful projects, such as EventSphere, a dynamic event management platform, and EstateVerse, a real estate app focused on special offers. His technical expertise extends to implementing secure payment gateways using Razorpay and leveraging Google Cloud services like Firebase Authentication, Firestore, and Google Places API for enhanced functionality and seamless user experiences.

Sujal’s professional journey includes internships at NotesEra and Indo-Tech, where he contributed to building robust front-end and full-stack solutions, optimizing performance, and enhancing user engagement. Beyond his technical skills, Sujal has been an active contributor to the open-source community as a GDSC Open Source Mentor and Hacktoberfest Top Contributor.

With strong communication, teamwork, and management skills, Sujal excels in collaborative environments and thrives on tackling challenges with innovative solutions. His forward-thinking mindset and dedication to learning make him a valuable asset to any team.

---

## Key Features

- **Dynamic Course Recommendations**: Suggests courses based on user answers during onboarding.
- **Adaptive Learning**: Automatically adjusts module difficulty based on user performance and feedback.
- **Structured Learning Path**: Provides a progressive sequence of modules tailored to the user's learning level.
- **Customizable Difficulty**: Users can influence module difficulty based on their feedback and quiz outcomes.

---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) - A React framework for building fast, scalable web applications.
- **Backend & Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore) - NoSQL database for real-time data storage and retrieval.
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth) - Secure Google Sign-In for user authentication.
- **Storage**: [Google Cloud Storage](https://cloud.google.com/storage) - Handles image and file uploads for the platform.

---

## Screenshots

### Onboarding Flow
![Onboarding Flow](img/readme/onboarding.png)

### Course Recommendation
![Course Recommendation](img/readme/course-recommendation.png)

### Module Progress and Feedback
![Module Progress](img/readme/module-progress.png)

---

## Installation and Setup

### Prerequisites

1. [Node.js](https://nodejs.org/) installed.
2. Firebase project setup with Firestore, Authentication, and Cloud Storage.

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add Firebase configuration:
     ```makefile
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     ```

4. Run the development server:
     ```bash
     npm run dev
     ```

5. Open your browser and navigate to:
     ```bash
     http://localhost:3000
     ```

---

## Deployment
To deploy the application, follow these steps:

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

3. Alternatively, deploy to a cloud hosting service such as Vercel or Firebase Hosting.

---

## Project Structure
   ```
   └── skillpath/
      ├── .next/
      ├── node_modules/
      └── src/
      ├── .env.local
      ├── firebase.js
      └── dashboard.js
      ├── jsconfig.json
      └── package.json
   ```

### Inside src folder:
   - components/: Contains reusable React components.
   - pages/: Next.js pages for routing.
   - public/: Static assets like images and files.
   - styles/: CSS modules for styling.
   - utils/: Utility functions.

---

### Commands

| **Command**   | **Description**                          |
|---------------|------------------------------------------|
| npm run dev   | Starts the development server.           |
| npm run build | Builds the application for production.   |
| npm run start | Runs the application in production mode. |

---

### Contributing
Contributions are welcome! Please fork the repository and create a pull request.
Raising an "issue" first would increase the chances of your pull request being noticed.

---

### Contact
For any inquiries, please reach out to:

Email: sujal99ds@gmail.com
<br/>
GitHub: https://github.com/Sujal-2820




