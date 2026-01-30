import { SignIn, SignUp } from '@clerk/clerk-react';
import { useState } from 'react';


export function Auth() {
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');

    // Listen for hash changes to switch between signin/signup
    if (window.location.hash === '#/signup' && mode !== 'signup') {
        setMode('signup');
    } else if (window.location.hash === '#/signin' && mode !== 'signin') {
        setMode('signin');
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 animate-in fade-in duration-500">


            {mode === 'signin' ? (
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: 'mx-auto w-full max-w-md',
                            card: 'shadow-xl border border-border/50 bg-card rounded-2xl',
                            headerTitle: 'text-foreground',
                            headerSubtitle: 'text-muted-foreground',
                            formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
                        },
                    }}
                    routing="hash"
                    signUpUrl="#/signup"
                />
            ) : (
                <SignUp
                    appearance={{
                        elements: {
                            rootBox: 'mx-auto w-full max-w-md',
                            card: 'shadow-xl border border-border/50 bg-card rounded-2xl',
                            headerTitle: 'text-foreground',
                            headerSubtitle: 'text-muted-foreground',
                            formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
                        },
                    }}
                    routing="hash"
                    signInUrl="#/signin"
                />
            )}
        </div>
    );
}
