import { FiPlus } from 'react-icons/fi';

interface RelatedQuestionsProps {
    questions: string[];
    onSelect: (question: string) => void;
}

export function RelatedQuestions({ questions, onSelect }: RelatedQuestionsProps) {
    if (!questions || questions.length === 0) return null;

    return (
        <div className="w-full mt-8 pt-6 border-t border-border/40">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Related</h3>
            <div className="space-y-2">
                {questions.map((question, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelect(question)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm text-foreground/80 hover:text-foreground bg-card/30 hover:bg-card border border-border/40 hover:border-border rounded-lg transition-all duration-150 group"
                    >
                        <span className="flex-1">{question}</span>
                        <FiPlus className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </button>
                ))}
            </div>
        </div>
    );
}
