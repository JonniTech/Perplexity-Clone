import { Footer } from '@/components/Footer';

export function NotImplemented() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-medium">🚧</h1>
                    <h2 className="text-2xl font-medium">Feature Not Implemented</h2>
                    <p className="text-muted-foreground">
                        This feature is coming soon! We're working hard to bring you new capabilities.
                    </p>
                </div>

                <div className="pt-4">
                    <button
                        onClick={() => window.location.hash = '#/chat'}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Back to Chat
                    </button>
                </div>
            </div>

            <div className="fixed bottom-0 w-full">
                <Footer />
            </div>
        </div>
    );
}
