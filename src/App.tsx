import { useState, useEffect } from 'react';
import { MainLayout } from './layout/MainLayout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { SetupProfile } from './pages/SetupProfile';

import Homepage from './pages/Homepage';
import Discover from './pages/Discover';
import Connect from './pages/Connect';
import Events from './pages/Events';
import Profile from './pages/Profile';

function App() {
  // Check if the user is already logged in
  const [currentScreen, setCurrentScreen] = useState(() => {
    return localStorage.getItem('token') ? 'app' : 'landing';
  });

  const [activeTab, setActiveTab] = useState('home');

  // Auto logout after inactivity
  useEffect(() => {
    if (currentScreen !== 'app') return;

    const TIMEOUT = 30 * 60 * 1000; // 30 minutes
    let timer: ReturnType<typeof setTimeout>;

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setCurrentScreen('landing');
    };

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(logout, TIMEOUT);
    };

    const events = [
      'mousemove',
      'mousedown',
      'keydown',
      'scroll',
      'touchstart',
      'click',
    ];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [currentScreen]);

  // App Interior Core Dashboard Router Content
  const renderAppTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <Homepage />;
      case 'discover':
        return <Discover />;
      case 'connect':
        return <Connect />;
      case 'events':
        return <Events />;
      case 'profile':
        return <Profile />;
      default:
        return <Homepage />;
    }
  };

  // Primary Workspace Global Screen Switcher
  switch (currentScreen) {
    case 'landing':
      return <Landing onNavigate={setCurrentScreen} />;

    case 'login':
      return <Login onNavigate={setCurrentScreen} />;

    case 'register':
      return <Register onNavigate={setCurrentScreen} />;

    case 'setup':
      return <SetupProfile onNavigate={setCurrentScreen} />;

    case 'app':
      return (
        <MainLayout
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        >
          {renderAppTabContent()}
        </MainLayout>
      );

    default:
      return <Landing onNavigate={setCurrentScreen} />;
  }
}

export default App;