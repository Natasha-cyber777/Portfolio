/* global __firebase_config, __app_id, __initial_auth_token */
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, query } from 'firebase/firestore';

// Import your HomePage component
import HomePage from './components/HomePage';

// IMPORTANT: Assuming you have a firebase.js file in your src/ directory
// that exports your Firebase configuration.
// Example: src/firebase.js
// const firebaseConfig = {
//   apiKey: "YOUR_ACTUAL_API_KEY",
//   authDomain: "your-project-id.firebaseapp.com",
//   projectId: "your-project-id",
//   storageBucket: "your-project-id.appspot.com",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };
// export default firebaseConfig;
import localFirebaseConfigFromFile from './firebase'; // Adjust path if your firebase.js is elsewhere

// Main App component
function App() {
  // State variables for Firebase instances and user ID
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('about'); // State for active section

  // Define appId, firebaseConfig, and initialAuthToken with fallbacks
  // Use the global __firebase_config if available (Canvas environment),
  // otherwise use the config imported from your local firebase.js file.
  const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : localFirebaseConfigFromFile;
  const appId = typeof __app_id !== 'undefined' ? __app_id : firebaseConfig.projectId || 'default-app-id'; // Fallback to projectId from config or generic ID
  const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;


  // Firebase initialization and authentication effect
  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        if (!firebaseConfig || !firebaseConfig.apiKey) {
          throw new Error("Firebase configuration is missing or invalid. Please provide a valid config in src/firebase.js.");
        }

        const app = initializeApp(firebaseConfig);
        const firestoreDb = getFirestore(app);
        const firebaseAuth = getAuth(app);

        setDb(firestoreDb);

        const unsubscribeAuth = onAuthStateChanged(firebaseAuth, async (user) => {
          if (user) {
            setUserId(user.uid);
            console.log("Firebase user ID:", user.uid);
          } else {
            if (!initialAuthToken) {
              await signInAnonymously(firebaseAuth);
              console.log("Signed in anonymously.");
            }
          }
          setLoading(false);
        });

        if (initialAuthToken) {
          await signInWithCustomToken(firebaseAuth, initialAuthToken);
          console.log("Signed in with custom token.");
        }

        return () => unsubscribeAuth();
      } catch (err) {
        console.error("Error initializing Firebase:", err);
        setError("Failed to initialize Firebase. Please check your configuration. " + err.message);
        setLoading(false);
      }
    };

    initializeFirebase();
  }, [firebaseConfig, initialAuthToken]);

  // Fetch portfolio items from Firestore effect
  useEffect(() => {
    if (db && userId) {
      const fetchPortfolioItems = () => {
        try {
          const collectionPath = `artifacts/${appId}/public/data/portfolioItems`;
          const q = query(collection(db, collectionPath));

          const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            items.sort((a, b) => (a.order || 0) - (b.order || 0));
            setPortfolioItems(items);
            setLoading(false);
          }, (err) => {
            console.error("Error fetching portfolio items:", err);
            setError("Failed to load portfolio items.");
            setLoading(false);
          });

          return () => unsubscribe();
        } catch (err) {
          console.error("Error setting up Firestore listener:", err);
          setError("Failed to set up data listener.");
            setLoading(false);
        }
      };

      fetchPortfolioItems();
    }
  }, [db, userId, appId]);

  // Helper to filter items by type
  const getItemsByType = (type) => {
    return portfolioItems.filter(item => item.type === type);
  };

  const aboutContent = getItemsByType('about')[0];
  const projects = getItemsByType('project');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 font-inter">
        <div className="text-lg text-gray-700">Loading portfolio...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-800 font-inter p-4 rounded-lg">
        <p>Error: {error}</p>
        <p>Please ensure Firebase is correctly configured and your security rules allow public read access to `/artifacts/{appId}/public/data/portfolioItems`.</p>
        <p>Your current user ID (for debugging): {userId || 'Not available'}</p>
      </div>
    );
  }

  // Render the HomePage component, passing necessary data as props
  return (
    <HomePage
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      aboutContent={aboutContent}
      projects={projects}
      userId={userId}
    />
  );
}

export default App;
