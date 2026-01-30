import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/lib/store';
import { sendChatMessage, type Message } from '@/lib/openai';
import { searchWeb } from '@/lib/search';

export function useChat() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const {
        activeConversationId,
        getActiveConversation,
        addMessage,
        updateLastMessage,
        updateConversationTitle,
    } = useChatStore();

    const activeConversation = getActiveConversation();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeConversation?.messages]);

    const sendMessage = async (content: string) => {
        if (!content.trim() || !activeConversationId || isLoading) return;

        setError(null);
        setIsLoading(true);

        // Add user message
        const userMessage: Message = { role: 'user', content: content.trim() };
        addMessage(activeConversationId, userMessage);

        // Update conversation title if it's the first message
        if (activeConversation?.messages.length === 0) {
            const title = content.trim().slice(0, 50) + (content.length > 50 ? '...' : '');
            updateConversationTitle(activeConversationId, title);
        }

        try {
            // 1. Perform Search
            let searchContext = '';
            let sources: any[] = [];

            try {
                const searchResponse = await searchWeb(content.trim());
                if (searchResponse.results.length > 0) {
                    sources = searchResponse.results;
                    searchContext = `
Search Results:
${searchResponse.results.map((r, i) => `[${i + 1}] "${r.title}" - ${r.snippet} (Source: ${r.link})`).join('\n')}

INSTRUCTIONS:
- You are a helpful "Answer Engine" that provides comprehensive, accurate answers based on the search results.
- Your goal is to synthesize the information into a coherent narrative.
- ALWAYS cite your sources using the format [1], [2], etc. inline where the information is used.
- If the search results don't fully answer the question, admit what you don't know but try to answer with general knowledge while clarifying what comes from search vs general knowledge.
- Format your answer in Markdown. Use bold for key terms.
- Be objective and direct.
`;
                }
            } catch (searchErr) {
                console.error('Search failed, falling back to pure LLM:', searchErr);
            }

            // Prepare messages for API
            const systemMessage: Message = {
                role: 'system',
                content: searchContext
                    ? `You are an AI assistant powered by web search. Use the provided Search Results to answer the user question. ${searchContext}`
                    : 'You are a helpful AI assistant. Provide accurate and concise answers.',
            };

            // Messages for the LLM (omit the raw search context from the history visible to the user, but inject it here)
            // Ideally we only inject the system prompt which contains the context
            const allMessages = [
                systemMessage,
                ...(activeConversation?.messages || []),
                userMessage,
            ];

            // Add assistant message with potential placeholder
            const assistantMessage: Message = {
                role: 'assistant',
                content: '',
                sources: sources.length > 0 ? sources : undefined
            };
            addMessage(activeConversationId, assistantMessage);

            // Call API
            const response = await sendChatMessage(allMessages);

            // Update assistant message with final response and existing sources
            // useChatStore needs to support updating the whole message or we rely on the object reference if it was shallow, 
            // but updateLastMessage only takes content string usually. We might need to update the store logic or just overwrite content.
            // Wait, updateLastMessage signature maps to store implementation. Let's check store.ts if we need to change it.
            // For now, assuming updateLastMessage updates the content, we need to ensure sources are preserved or passed.
            // Let's modify updateLastMessage to accept partial text updates, OR we just trust that we added the message with sources above.
            updateLastMessage(activeConversationId, response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send message');
            console.error('Error sending message:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        messages: activeConversation?.messages || [],
        isLoading,
        error,
        sendMessage,
        messagesEndRef,
    };
}
