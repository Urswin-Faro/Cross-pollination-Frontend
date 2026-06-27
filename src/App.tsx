import { useState } from 'react';
import { MainLayout } from './layout/MainLayout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { SetupProfile } from './pages/SetupProfile';

/* 👇 REMOVED THE CURLY BRACES HERE 👇 */
import Homepage from './pages/Homepage';
import Discover from './pages/Discover';
import Connect from './pages/Connect';
import Events from './pages/Events';
import Profile from './pages/Profile';

function App() {
  // Global view context manager. Options: 'landing' | 'login' | 'register' | 'setup' | 'app'
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [activeTab, setActiveTab] = useState('home');

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

  // Primary Workspace Global Screen Switcher router
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
        <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
          {renderAppTabContent()}
        </MainLayout>
      );
    default:
      return <Landing onNavigate={setCurrentScreen} />;
  }
}

export default App;