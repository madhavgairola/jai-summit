import React, { useState, useEffect, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Safely discover local TestApp if present on local machine (empty object on GitHub / remote)
const testModules = import.meta.glob('./TestApp.jsx');
const TestApp = testModules['./TestApp.jsx'] ? lazy(testModules['./TestApp.jsx']) : null;

function Root() {
  const [currentPath, setCurrentPath] = useState(
    () => window.location.pathname.toLowerCase() + window.location.hash.toLowerCase()
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname.toLowerCase() + window.location.hash.toLowerCase());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const isTest = currentPath.startsWith('/test') || currentPath.includes('#/test');

  if (isTest && TestApp) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#eaeff4] dark:bg-[#070b16] flex items-center justify-center">Loading...</div>}>
        <TestApp />
      </Suspense>
    );
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
