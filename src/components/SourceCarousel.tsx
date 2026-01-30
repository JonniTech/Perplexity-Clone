import { motion } from 'framer-motion';
import type { Source } from '@/lib/openai';
import { FiExternalLink } from 'react-icons/fi';

interface SourceCarouselProps {
    sources: Source[];
}

export function SourceCarousel({ sources }: SourceCarouselProps) {
    if (!sources || sources.length === 0) return null;

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-muted-foreground">Sources</span>
                <span className="text-xs text-muted-foreground/60 bg-muted px-1.5 py-0.5 rounded">
                    {sources.length}
                </span>
            </div>

            {/* Source Grid - Perplexity uses a horizontal scrolling row of small cards */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                {sources.map((source, idx) => (
                    <motion.a
                        key={idx}
                        href={source.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.2 }}
                        className="flex-shrink-0 group"
                    >
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 bg-card/50 hover:bg-card hover:border-border transition-all duration-150 max-w-[200px]">
                            {/* Number Badge */}
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted text-xs font-medium flex items-center justify-center text-muted-foreground">
                                {idx + 1}
                            </span>

                            {/* Favicon + Domain */}
                            <div className="flex items-center gap-1.5 min-w-0 flex-1">
                                {source.favicon ? (
                                    <img
                                        src={source.favicon}
                                        alt=""
                                        className="w-4 h-4 rounded-sm object-cover flex-shrink-0"
                                        onError={(e) => (e.currentTarget.style.display = 'none')}
                                    />
                                ) : (
                                    <div className="w-4 h-4 rounded-sm bg-muted flex-shrink-0" />
                                )}
                                <span className="text-xs text-muted-foreground truncate">
                                    {source.source}
                                </span>
                            </div>

                            {/* External Link Icon (on hover) */}
                            <FiExternalLink className="w-3 h-3 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>
    );
}
