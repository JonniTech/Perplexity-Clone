import {
    FiPlus,
    FiMessageSquare,
    FiTrash2,
    FiHome,
    FiCompass,
    FiBookOpen,
    FiChevronsLeft,
    FiChevronsRight,
    FiLayers,
    FiSettings,
    FiSmartphone,
} from 'react-icons/fi';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { useChatStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { PerplexityLogo } from './PerplexityLogo';

interface SidebarProps {
    isMobileOpen?: boolean;
    isDesktopCollapsed?: boolean;
    onMobileClose?: () => void;
    onDesktopToggle?: () => void;
}

export function Sidebar({
    isMobileOpen = false,
    isDesktopCollapsed = false,
    onMobileClose,
    onDesktopToggle
}: SidebarProps) {
    const {
        conversations,
        activeConversationId,
        createConversation,
        setActiveConversation,
        deleteConversation,
    } = useChatStore();

    const handleNewChat = () => {
        createConversation();
        onMobileClose?.();
    };

    const handleSelectConversation = (id: string) => {
        setActiveConversation(id);
        onMobileClose?.();
    };

    const handleDeleteConversation = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        deleteConversation(id);
    };

    const handleNavigation = (hash: string) => {
        window.location.hash = hash;
        onMobileClose?.();
    };

    return (
        <>
            {/* Mobile overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={onMobileClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed md:relative inset-y-0 left-0 z-50 bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out',
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full',
                    'md:translate-x-0',
                    isDesktopCollapsed ? 'md:w-16' : 'md:w-60',
                    'w-64'
                )}
            >
                {/* Logo & Collapse Toggle */}
                <div className="p-3 border-b border-sidebar-border flex items-center justify-between flex-shrink-0">
                    <div className={cn(
                        "transition-opacity duration-200",
                        isDesktopCollapsed ? "md:opacity-0 md:w-0 overflow-hidden" : "md:opacity-100"
                    )}>
                        <PerplexityLogo size="sm" showText />
                    </div>
                    <Button
                        onClick={onDesktopToggle}
                        className="hidden md:flex h-8 w-8 text-black dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        variant="ghost"
                        size="icon"
                        title={isDesktopCollapsed ? "Expand" : "Collapse"}
                    >
                        {isDesktopCollapsed ? (
                            <FiChevronsRight className="w-4 h-4" />
                        ) : (
                            <FiChevronsLeft className="w-4 h-4" />
                        )}
                    </Button>
                </div>

                {/* Main Navigation */}
                <div className="p-2 space-y-1 flex-shrink-0">
                    <Button
                        onClick={handleNewChat}
                        className={cn(
                            "w-full gap-3 text-sm h-10 justify-start bg-sidebar-border/50 hover:bg-sidebar-border text-foreground border border-sidebar-border mb-2 rounded-full",
                            isDesktopCollapsed && "md:justify-center md:px-0 md:w-10 md:h-10 md:rounded-lg"
                        )}
                        variant="ghost"
                        title="New Thread"
                    >
                        <FiPlus className="w-4 h-4 flex-shrink-0" />
                        <span className={cn(isDesktopCollapsed && "md:hidden", "truncate")}>New Thread</span>
                    </Button>

                    <Button
                        onClick={() => handleNavigation('#/')}
                        className={cn(
                            "w-full gap-3 text-sm h-9 justify-start text-muted-foreground hover:text-foreground",
                            isDesktopCollapsed && "md:justify-center md:px-0"
                        )}
                        variant="ghost"
                        title="Home"
                    >
                        <FiHome className="w-4 h-4 flex-shrink-0" />
                        <span className={cn(isDesktopCollapsed && "md:hidden", "truncate")}>Home</span>
                    </Button>

                    <Button
                        onClick={() => handleNavigation('#/not-implemented')}
                        className={cn(
                            "w-full gap-3 text-sm h-9 justify-start text-muted-foreground hover:text-foreground",
                            isDesktopCollapsed && "md:justify-center md:px-0"
                        )}
                        variant="ghost"
                        title="Discover"
                    >
                        <FiCompass className="w-4 h-4 flex-shrink-0" />
                        <span className={cn(isDesktopCollapsed && "md:hidden", "truncate")}>Discover</span>
                    </Button>

                    <Button
                        onClick={() => handleNavigation('#/not-implemented')}
                        className={cn(
                            "w-full gap-3 text-sm h-9 justify-start text-muted-foreground hover:text-foreground",
                            isDesktopCollapsed && "md:justify-center md:px-0"
                        )}
                        variant="ghost"
                        title="Spaces"
                    >
                        <FiLayers className="w-4 h-4 flex-shrink-0" />
                        <span className={cn(isDesktopCollapsed && "md:hidden", "truncate")}>Spaces</span>
                    </Button>

                    <Button
                        onClick={() => handleNavigation('#/not-implemented')}
                        className={cn(
                            "w-full gap-3 text-sm h-9 justify-start text-muted-foreground hover:text-foreground",
                            isDesktopCollapsed && "md:justify-center md:px-0"
                        )}
                        variant="ghost"
                        title="Library"
                    >
                        <FiBookOpen className="w-4 h-4 flex-shrink-0" />
                        <span className={cn(isDesktopCollapsed && "md:hidden", "truncate")}>Library</span>
                    </Button>
                </div>

                {/* Thread History */}
                <div className={cn(
                    "flex-1 flex flex-col min-h-0 mt-2",
                    isDesktopCollapsed && "md:hidden"
                )}>
                    <div className="px-4 py-2 text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider flex-shrink-0">
                        Threads
                    </div>

                    <ScrollArea className="flex-1 min-h-0 px-2">
                        <div className="space-y-1 pb-4">
                            {conversations.length === 0 ? (
                                <div className="px-3 py-6 text-center text-sm text-muted-foreground/50">
                                    No threads yet
                                </div>
                            ) : (
                                conversations.map((conversation) => (
                                    <div
                                        key={conversation.id}
                                        onClick={() => handleSelectConversation(conversation.id)}
                                        className={cn(
                                            'group flex items-start gap-2 rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-colors',
                                            activeConversationId === conversation.id
                                                ? 'bg-sidebar-accent text-sidebar-foreground'
                                                : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                                        )}
                                    >
                                        <FiMessageSquare className="w-4 h-4 shrink-0 mt-0.5" />
                                        <span className="flex-1 text-sm leading-relaxed break-words">
                                            {conversation.title}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-transparent"
                                            onClick={(e) => handleDeleteConversation(conversation.id, e)}
                                            title="Delete thread"
                                        >
                                            <FiTrash2 className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                </div>

                {/* Bottom Section (Footer) */}
                <div className="p-2 border-t border-sidebar-border mt-auto flex-shrink-0 space-y-1">
                    <Button
                        onClick={() => handleNavigation('#/not-implemented')}
                        className={cn(
                            "w-full gap-3 text-sm h-9 justify-start text-muted-foreground hover:text-foreground",
                            isDesktopCollapsed && "md:justify-center md:px-0"
                        )}
                        variant="ghost"
                        title="Sign Up"
                    >
                        <FiSmartphone className="w-4 h-4 flex-shrink-0" />
                        <span className={cn(isDesktopCollapsed && "md:hidden", "truncate")}>Download</span>
                    </Button>

                    <div className={cn("hidden md:block transition-all", isDesktopCollapsed && "hidden")}>
                        <div className="h-px bg-sidebar-border my-1 mx-2"></div>
                    </div>

                    <Button
                        onClick={() => handleNavigation('#/not-implemented')}
                        className={cn(
                            "w-full gap-3 text-sm h-9 justify-start text-muted-foreground hover:text-foreground",
                            isDesktopCollapsed && "md:justify-center md:px-0"
                        )}
                        variant="ghost"
                        title="Settings"
                    >
                        <FiSettings className="w-4 h-4 flex-shrink-0" />
                        <span className={cn(isDesktopCollapsed && "md:hidden", "truncate")}>Settings</span>
                    </Button>

                    <div className={cn(
                        "flex items-center justify-between px-2 py-2 mt-1",
                        isDesktopCollapsed && "hidden"
                    )}>
                        <div className="flex flex-col">
                            <span className="text-xs font-medium text-foreground">Pro</span>
                            <span className="text-[10px] text-muted-foreground">Upgrade</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    </div>
                </div>
            </aside>
        </>
    );
}
