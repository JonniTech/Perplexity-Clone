import { useState, type KeyboardEvent } from 'react';
import { FiArrowUp, FiSearch, FiPaperclip, FiGlobe } from 'react-icons/fi';
import { Textarea } from './ui/textarea';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
    const [message, setMessage] = useState('');
    const [focusMode, setFocusMode] = useState<'all' | 'academic' | 'youtube'>('all');

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSend(message);
            setMessage('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const cycleFocus = () => {
        const modes: Array<'all' | 'academic' | 'youtube'> = ['all', 'academic', 'youtube'];
        const currentIndex = modes.indexOf(focusMode);
        setFocusMode(modes[(currentIndex + 1) % modes.length]);
    };

    const focusLabels = {
        all: 'All',
        academic: 'Academic',
        youtube: 'YouTube'
    };

    return (
        <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-4 pb-4 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="relative bg-card border border-border/30 rounded-2xl shadow-lg focus-within:border-primary/50 focus-within:shadow-xl transition-all duration-200">
                    {/* Top Row: Input */}
                    <div className="flex items-center">
                        {/* Search Icon */}
                        <div className="pl-4 flex items-center pointer-events-none">
                            <FiSearch className="w-5 h-5 text-muted-foreground/60" />
                        </div>

                        {/* Input */}
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask anything..."
                            disabled={disabled}
                            className="flex-1 min-h-[52px] max-h-[150px] py-3.5 px-3 bg-transparent border-0 focus-visible:ring-0 resize-none text-base placeholder:text-muted-foreground/50"
                            rows={1}
                        />

                        {/* Submit Button */}
                        <div className="pr-3 flex items-center">
                            <button
                                onClick={handleSend}
                                disabled={disabled || !message.trim()}
                                className="w-9 h-9 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
                            >
                                <FiArrowUp className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Bottom Row: Action Buttons */}
                    <div className="flex items-center gap-1 px-3 pb-2.5 pt-0.5">
                        {/* Focus Toggle */}
                        <button
                            onClick={cycleFocus}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-lg transition-colors"
                            title="Change search focus"
                        >
                            <FiGlobe className="w-3.5 h-3.5" />
                            <span>{focusLabels[focusMode]}</span>
                        </button>

                        {/* Attach Button */}
                        <button
                            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-lg transition-colors"
                            title="Attach file (coming soon)"
                        >
                            <FiPaperclip className="w-3.5 h-3.5" />
                        </button>

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* Pro Badge */}
                        <span className="text-[10px] font-medium text-muted-foreground/50 px-2 py-1 bg-muted/30 rounded">
                            Free
                        </span>
                    </div>
                </div>

                {/* Subtle Disclaimer */}
                <p className="text-center text-xs text-muted-foreground/40 mt-2">
                    Powered by SerpAPI Google Search Engine
                </p>
            </div>
        </div>
    );
}
