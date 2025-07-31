# Firebase Setup Guide

This guide will help you set up Firebase to save your application form data.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "flying-studies-center")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Set Up Firestore Database

1. In your Firebase project console, click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database (choose the closest to your users)
5. Click "Done"

## Step 3: Get Your Firebase Configuration

1. In the Firebase console, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to the "Your apps" section
4. Click "Add app" and choose the web icon (</>)
5. Register your app with a nickname (e.g., "flying-studies-web")
6. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyC...",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef..."
};
```

## Step 4: Update Your Configuration

1. Open the `apply-simple.html` file
2. Find the `firebaseConfig` object in the JavaScript section
3. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_ACTUAL_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_ACTUAL_PROJECT_ID",
    storageBucket: "YOUR_ACTUAL_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
    appId: "YOUR_ACTUAL_APP_ID"
};
```

## Step 5: Test Your Setup

1. Open `apply-simple.html` in your browser
2. Fill out the application form
3. Submit the form
4. Check the Firebase console → Firestore Database to see if the data was saved
5. You should see a new document in the "applications" collection

## Data Structure

Your application data will be saved in Firestore with the following structure:

```javascript
{
    timestamp: Timestamp,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1234567890",
    dateOfBirth: "1990-01-01",
    nationality: "American",
    address: "123 Main St, City, State",
    program: "Pilot Training",
    startDate: "Immediate",
    educationLevel: "Bachelor's Degree",
    graduationYear: "2012",
    institution: "University Name",
    hasExperience: "Yes",
    workExperience: "Previous work details...",
    source: ["Website", "Social Media"],
    motivation: "Why they want to join...",
    additionalInfo: "Any additional information...",
    status: "pending",
    createdAt: Timestamp
}
```

## Security Rules (Optional)

For production, you should set up proper Firestore security rules. In the Firebase console:

1. Go to Firestore Database → Rules
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /applications/{applicationId} {
      allow read, write: if true; // For development only
      // For production, use proper authentication rules
    }
  }
}
```

## Troubleshooting

- **"Firebase not defined" error**: Make sure the Firebase SDK scripts are loaded before your custom JavaScript
- **"Permission denied" error**: Check your Firestore security rules
- **Data not saving**: Check the browser console for error messages
- **Configuration errors**: Verify all Firebase config values are correct

## Next Steps

Once Firebase is working:
1. Set up proper authentication if needed
2. Configure security rules for production
3. Set up email notifications for new applications
4. Create an admin dashboard to view applications

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Firebase configuration
3. Ensure your Firestore database is created and accessible
4. Check the Firebase console for any error logs 