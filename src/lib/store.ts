import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Message } from './openai';

export interface Conversation {
    id: string;
    title: string;
    messages: Message[];
    createdAt: number;
    updatedAt: number;
}

interface ChatStore {
    conversations: Conversation[];
    activeConversationId: string | null;

    // Actions
    createConversation: () => string;
    deleteConversation: (id: string) => void;
    setActiveConversation: (id: string) => void;
    addMessage: (conversationId: string, message: Message) => void;
    updateLastMessage: (conversationId: string, updates: string | Partial<Message>) => void;
    updateConversationTitle: (conversationId: string, title: string) => void;
    getActiveConversation: () => Conversation | null;
}

export const useChatStore = create<ChatStore>()(
    persist(
        (set, get) => ({
            conversations: [],
            activeConversationId: null,

            createConversation: () => {
                const id = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                const newConversation: Conversation = {
                    id,
                    title: 'New Chat',
                    messages: [],
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                };

                set((state) => ({
                    conversations: [newConversation, ...state.conversations],
                    activeConversationId: id,
                }));

                return id;
            },

            deleteConversation: (id) => {
                set((state) => {
                    const newConversations = state.conversations.filter((c) => c.id !== id);
                    const newActiveId = state.activeConversationId === id
                        ? (newConversations[0]?.id || null)
                        : state.activeConversationId;

                    return {
                        conversations: newConversations,
                        activeConversationId: newActiveId,
                    };
                });
            },

            setActiveConversation: (id) => {
                set({ activeConversationId: id });
            },

            addMessage: (conversationId, message) => {
                set((state) => ({
                    conversations: state.conversations.map((conv) =>
                        conv.id === conversationId
                            ? {
                                ...conv,
                                messages: [...conv.messages, message],
                                updatedAt: Date.now(),
                            }
                            : conv
                    ),
                }));
            },

            updateLastMessage: (conversationId, updates) => {
                set((state) => ({
                    conversations: state.conversations.map((conv) =>
                        conv.id === conversationId
                            ? {
                                ...conv,
                                messages: conv.messages.map((msg, idx) =>
                                    idx === conv.messages.length - 1
                                        ? { ...msg, ...(typeof updates === 'string' ? { content: updates } : updates) }
                                        : msg
                                ),
                                updatedAt: Date.now(),
                            }
                            : conv
                    ),
                }));
            },

            updateConversationTitle: (conversationId, title) => {
                set((state) => ({
                    conversations: state.conversations.map((conv) =>
                        conv.id === conversationId
                            ? { ...conv, title, updatedAt: Date.now() }
                            : conv
                    ),
                }));
            },

            getActiveConversation: () => {
                const state = get();
                return state.conversations.find((c) => c.id === state.activeConversationId) || null;
            },
        }),
        {
            name: 'chat-storage',
        }
    )
);
