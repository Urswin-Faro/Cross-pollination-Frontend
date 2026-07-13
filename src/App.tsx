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
  const [currentScreen, setCurrentScreen] = useState(() => {
    return localStorage.getItem('token') ? 'app' : 'landing';
  });

  const [activeTab, setActiveTab] = useState('home');

  // This is the function that will eventually be triggered by the Sidebar button
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setCurrentScreen('landing');
  };

  useEffect(() => {
    if (currentScreen !== 'app') return;

    const TIMEOUT = 30 * 60 * 1000; // 30 minutes
    let timer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(handleLogout, TIMEOUT);
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [currentScreen]);

  const renderAppTabContent = () => {
    switch (activeTab) {
      case 'home': return <Homepage />;
      case 'discover': return <Discover />;
      case 'connect': return <Connect />;
      case 'events': return <Events />;
      case 'profile': return <Profile />;
      default: return <Homepage />;
    }
  };

  switch (currentScreen) {
    case 'landing': return <Landing onNavigate={setCurrentScreen} />;
    case 'login': return <Login onNavigate={setCurrentScreen} />;
    case 'register': return <Register onNavigate={setCurrentScreen} />;
    case 'setup': return <SetupProfile onNavigate={setCurrentScreen} />;
    
    case 'app':
      return (
        <MainLayout
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout} // <--- This prop connects the App to the MainLayout
        >
          {renderAppTabContent()}
        </MainLayout>
      );

    default:
      return <Landing onNavigate={setCurrentScreen} />;
  }
}

export default App;