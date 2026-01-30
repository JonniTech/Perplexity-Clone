import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFileText, FiEdit3 } from 'react-icons/fi';

const thinkingSteps = [
    { text: 'Searching the web...', icon: FiSearch },
    { text: 'Reading 5 sources...', icon: FiFileText },
    { text: 'Writing answer...', icon: FiEdit3 },
];

export function ThinkingIndicator() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => Math.min(prev + 1, thinkingSteps.length - 1));
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-3 py-2">
            {/* Progress Steps */}
            <div className="flex flex-col gap-2">
                {thinkingSteps.map((step, idx) => {
                    const Icon = step.icon;
                    const isActive = idx === currentStep;
                    const isCompleted = idx < currentStep;

                    return (
                        <AnimatePresence key={idx}>
                            {idx <= currentStep && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex items-center gap-2.5 text-sm ${isActive ? 'text-foreground' : isCompleted ? 'text-muted-foreground/60' : 'text-muted-foreground/40'
                                        }`}
                                >
                                    {/* Icon with animation */}
                                    <div className="relative w-5 h-5 flex items-center justify-center">
                                        {isActive ? (
                                            <>
                                                <motion.div
                                                    className="absolute inset-0 rounded-full border-2 border-primary/30"
                                                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                                />
                                                <Icon className="w-3.5 h-3.5 text-primary" />
                                            </>
                                        ) : isCompleted ? (
                                            <span className="text-primary text-xs">✓</span>
                                        ) : (
                                            <Icon className="w-3.5 h-3.5" />
                                        )}
                                    </div>
                                    <span className={isActive ? 'font-medium' : ''}>
                                        {step.text}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    );
                })}
            </div>
        </div>
    );
}
