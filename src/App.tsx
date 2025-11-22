import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import SignUpSelection from './components/SignUpSelection';
import OnboardingFlow from './components/OnboardingFlow';
import SwipeScreen from './components/SwipeScreen';
import JobDetailsScreen from './components/JobDetailsScreen';
import MatchScreen from './components/MatchScreen';
import MessagingScreen from './components/MessagingScreen';
import SavedJobsScreen from './components/SavedJobsScreen';
import ProfileScreen from './components/ProfileScreen';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import IOSInstallPrompt from './components/IOSInstallPrompt';
import OfflineIndicator from './components/OfflineIndicator';
import UpdateNotifier from './components/UpdateNotifier';
import { registerServiceWorker } from './utils/pwa-utils';

// Create a context for shared state
const AppContext = createContext<any>(null);
export const useAppContext = () => useContext(AppContext);

// A component to handle the splash screen logic
function SplashHandler() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return <SplashScreen />;
}

function AppRoutes() {
  const { selectedJob, matchedJob, userType } = useAppContext();

  return (
    <Routes>
      <Route path="/" element={<SplashHandler />} />
      <Route path="/welcome" element={<WelcomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpSelection />} />
      <Route path="/onboarding" element={<OnboardingFlow userType={userType} />} />
      <Route path="/swipe" element={<SwipeScreen />} />
      <Route path="/details" element={<JobDetailsScreen job={selectedJob} />} />
      <Route path="/match" element={<MatchScreen job={matchedJob} />} />
      <Route path="/messages" element={<MessagingScreen />} />
      <Route path="/saved" element={<SavedJobsScreen />} />
      <Route path="/profile" element={<ProfileScreen userType={userType} />} />
    </Routes>
  );
}

export default function App() {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [matchedJob, setMatchedJob] = useState<any>(null);
  const [userType, setUserType] = useState<'seeker' | 'employer'>('seeker');

  useEffect(() => {
    registerServiceWorker();
  }, []);

  const contextValue = {
    selectedJob,
    setSelectedJob,
    matchedJob,
    setMatchedJob,
    userType,
    setUserType,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="relative w-full h-screen bg-[#FAFAFA] overflow-hidden flex items-center justify-center">
        <PWAInstallPrompt />
        <IOSInstallPrompt />
        <OfflineIndicator />
        <UpdateNotifier />
        
        <div className="relative w-full max-w-[360px] h-full max-h-[800px] bg-white shadow-2xl rounded-[24px] overflow-hidden">
          <Router>
            <AppRoutes />
          </Router>
        </div>
      </div>
    </AppContext.Provider>
  );
}