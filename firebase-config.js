// Firebase Configuration Template
// Replace the placeholder values with your actual Firebase project credentials

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Instructions to get these values:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project or select an existing one
// 3. Click on the gear icon (⚙️) next to "Project Overview"
// 4. Select "Project settings"
// 5. Scroll down to "Your apps" section
// 6. Click "Add app" and choose "Web" (</>) 
// 7. Register your app and copy the config values
// 8. Replace the placeholder values above with your actual values

// After setting up Firebase:
// 1. Go to Firestore Database in the Firebase console
// 2. Click "Create database"
// 3. Choose "Start in test mode" for development
// 4. Select a location for your database
// 5. The applications will be saved in a collection called "applications"

export default firebaseConfig; 