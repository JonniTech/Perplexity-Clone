import { FiMenu, FiMoon, FiSun, FiSidebar } from 'react-icons/fi';
import { UserButton } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { useTheme } from './theme-provider';
import { PerplexityLogo } from './PerplexityLogo';

interface HeaderProps {
    onMenuClick?: () => void;
    onDesktopToggle?: () => void;
    isDesktopSidebarCollapsed?: boolean;
}

export function Header({ onMenuClick, onDesktopToggle, isDesktopSidebarCollapsed }: HeaderProps) {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-30 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-12 sm:h-14 items-center justify-between px-3 sm:px-4">
                {/* Left: Menu Button (Mobile) & Desktop Toggle */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden h-8 w-8 sm:h-9 sm:w-9"
                        onClick={onMenuClick}
                    >
                        <FiMenu className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>

                    {/* Desktop sidebar toggle - only visible when sidebar is collapsed */}
                    {isDesktopSidebarCollapsed && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden md:flex h-8 w-8 sm:h-9 sm:w-9"
                            onClick={onDesktopToggle}
                            title="Expand sidebar"
                        >
                            <FiSidebar className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                    )}

                    {/* Perplexity Logo - only show on mobile or when sidebar collapsed */}
                    <div className={`${!isDesktopSidebarCollapsed ? 'md:hidden' : ''}`}>
                        <PerplexityLogo size="sm" showText />
                    </div>
                </div>

                {/* Right: Theme Toggle & User */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="h-8 w-8 sm:h-9 sm:w-9"
                    >
                        {theme === 'dark' ? (
                            <FiSun className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                            <FiMoon className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                    </Button>
                    <div className="scale-90 sm:scale-100">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
            </div>
        </header>
    );
}
