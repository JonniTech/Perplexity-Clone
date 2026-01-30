import { motion } from 'framer-motion';

export function Footer() {
    return (
        <footer className="border-t border-border bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto flex h-auto min-h-12 flex-wrap items-center justify-center gap-x-4 gap-y-1 px-3 py-2 sm:h-14 sm:gap-6 sm:px-4 sm:py-0">
                <p className="text-xs sm:text-sm text-muted-foreground font-normal">
                    Developed by <span className="font-medium text-foreground">NYAGANYA</span>
                </p>

                <span className="hidden sm:inline text-muted-foreground/50">•</span>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground font-normal">
                    <span>Sponsored by</span>
                    <div className="flex flex-col -space-y-0.5 group cursor-pointer">
                        <motion.span
                            className="font-black text-xs sm:text-sm tracking-tighter italic bg-gradient-to-r from-tervux-pink via-tervux-purple to-tervux-pink bg-[length:200%_auto] bg-clip-text text-transparent"
                            animate={{ backgroundPosition: ["0% center", "200% center"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                            TERVUX
                        </motion.span>
                        <motion.div
                            className="h-[1.5px] w-0 bg-gradient-to-r from-tervux-pink to-tervux-purple group-hover:w-full transition-all duration-300 rounded-full"
                        />
                    </div>
                </div>

                <span className="hidden sm:inline text-muted-foreground/50">•</span>

                <p className="text-xs sm:text-sm text-muted-foreground font-normal">
                    Powered by <span className="font-medium text-foreground">GLM 4.7 Flash</span>
                </p>
            </div>
        </footer>
    );
}
