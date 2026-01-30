import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ChatList } from '@/components/ChatList';
import { ChatInput } from '@/components/ChatInput';
import { useChat } from '@/hooks/useChat';
import { useChatStore } from '@/lib/store';
import { Footer } from '@/components/Footer';

export function Chat() {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
    const { messages, isLoading, sendMessage, messagesEndRef } = useChat();
    const { activeConversationId, createConversation } = useChatStore();

    // Create initial conversation if none exists
    useEffect(() => {
        if (!activeConversationId) {
            createConversation();
        }
    }, [activeConversationId, createConversation]);

    const toggleDesktopSidebar = () => {
        setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar */}
            <Sidebar
                isMobileOpen={isMobileSidebarOpen}
                isDesktopCollapsed={isDesktopSidebarCollapsed}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
                onDesktopToggle={toggleDesktopSidebar}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    onMenuClick={() => setIsMobileSidebarOpen(true)}
                    onDesktopToggle={toggleDesktopSidebar}
                    isDesktopSidebarCollapsed={isDesktopSidebarCollapsed}
                />

                <ChatList messages={messages} messagesEndRef={messagesEndRef} onSend={sendMessage} />

                <ChatInput onSend={sendMessage} disabled={isLoading} />
                <Footer />
            </div>
        </div>
    );
}
