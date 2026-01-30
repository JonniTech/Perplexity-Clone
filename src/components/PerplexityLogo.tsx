import { cn } from '@/lib/utils';

interface PerplexityLogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    showText?: boolean;
}

// Perplexity's signature star/asterisk icon
export function PerplexityLogo({ size = 'md', className, showText = false }: PerplexityLogoProps) {
    const sizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-10 h-10',
    };

    const textSizes = {
        sm: 'text-base',
        md: 'text-lg',
        lg: 'text-xl',
        xl: 'text-2xl',
    };

    return (
        <div className={cn('flex items-center gap-2', className)}>
            {/* Perplexity Star Icon - SVG recreation of their asterisk logo */}
            <svg
                viewBox="0 0 24 24"
                fill="none"
                className={cn(sizeClasses[size], 'text-primary')}
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* 6-pointed star shape inspired by Perplexity's logo */}
                <path
                    d="M12 2L14.5 9.5H22L16 14.5L18.5 22L12 17.5L5.5 22L8 14.5L2 9.5H9.5L12 2Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinejoin="round"
                />
            </svg>

            {showText && (
                <span className={cn(
                    'font-medium tracking-tight',
                    textSizes[size]
                )}>
                    Perplexity
                </span>
            )}
        </div>
    );
}

// Alternative: Simple circular P icon
export function PerplexityIcon({ size = 'md', className }: Omit<PerplexityLogoProps, 'showText'>) {
    const sizeClasses = {
        sm: 'w-5 h-5 text-xs',
        md: 'w-6 h-6 text-sm',
        lg: 'w-8 h-8 text-base',
        xl: 'w-10 h-10 text-lg',
    };

    return (
        <div className={cn(
            'rounded-lg bg-primary/20 flex items-center justify-center font-bold text-primary',
            sizeClasses[size],
            className
        )}>
            P
        </div>
    );
}
