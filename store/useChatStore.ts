import { create } from 'zustand';

interface ChatMessage {
  _id: string;
  sender: any;
  receiver: any;
  text: string;
  type?: string;
  createdAt: string;
}

interface ChatState {
  conversations: any[];
  activeChatMessages: ChatMessage[];
  setConversations: (conversations: any[]) => void;
  setActiveChatMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  activeChatMessages: [],
  setConversations: (conversations) => set({ conversations }),
  setActiveChatMessages: (messages) => set({ activeChatMessages: messages }),
  addMessage: (message) => set((state) => ({ activeChatMessages: [...state.activeChatMessages, message] })),
}));