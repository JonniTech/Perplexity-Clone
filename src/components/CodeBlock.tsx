import { useState } from 'react';
import hljs from 'highlight.js';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { Button } from './ui/button';

interface CodeBlockProps {
    children: string;
    className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const language = className?.replace('language-', '') || '';

    let highlightedCode = children;
    try {
        if (language && hljs.getLanguage(language)) {
            highlightedCode = hljs.highlight(children, { language }).value;
        } else {
            highlightedCode = hljs.highlightAuto(children).value;
        }
    } catch (e) {
        // Fallback is original text
    }

    return (
        <div className="relative group my-4 rounded-lg border border-border/40 bg-zinc-950 dark:bg-zinc-950 overflow-hidden max-w-full">
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-border/40 bg-zinc-900/50 backdrop-blur">
                <span className="text-xs font-medium text-zinc-400">
                    {language || 'text'}
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="h-6 w-6 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 flex-shrink-0"
                >
                    {copied ? (
                        <FiCheck className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                        <FiCopy className="h-3.5 w-3.5" />
                    )}
                </Button>
            </div>
            <div className="p-3 sm:p-4 overflow-x-auto bg-zinc-950">
                <pre className="!m-0 !p-0 !bg-transparent text-white/90 whitespace-pre">
                    <code
                        className={`font-mono text-xs sm:text-sm !bg-transparent block ${className || ''}`}
                        dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    />
                </pre>
            </div>
        </div>
    );
}
