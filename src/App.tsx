import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { ThemeProvider } from './components/theme-provider';
import { Chat } from './pages/Chat';
import { Auth } from './pages/Auth';
import { Welcome } from './pages/Welcome';
import { NotImplemented } from './pages/NotImplemented';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Redirect to welcome if signed in and on auth pages
  useEffect(() => {
    if (isSignedIn && (currentPath === '#/signin' || currentPath === '#/signup')) {
      window.location.hash = '#/welcome';
    }
  }, [isSignedIn, currentPath]);

  // Handle routes
  if (currentPath === '#/not-implemented') {
    return (
      <ThemeProvider>
        <NotImplemented />
      </ThemeProvider>
    );
  }

  if (currentPath === '#/chat') {
    return (
      <ThemeProvider>
        <SignedIn>
          <Chat />
        </SignedIn>
        <SignedOut>
          <Auth />
        </SignedOut>
      </ThemeProvider>
    );
  }

  // Default to welcome page for signed-in users
  return (
    <ThemeProvider>
      <SignedIn>
        <Welcome />
      </SignedIn>
      <SignedOut>
        <Auth />
      </SignedOut>
    </ThemeProvider>
  );
}

export default App;
