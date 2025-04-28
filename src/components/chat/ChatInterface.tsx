import React, { useState } from 'react';
import { Paperclip, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
  selectedKnowledge?: string[];
  onCreateFlashcards?: () => void;
  onCreateQuiz?: () => void;
  onCreateStudyGuide?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  selectedKnowledge,
  onCreateFlashcards,
  onCreateQuiz,
  onCreateStudyGuide,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(),
      content: input,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: Math.random().toString(),
        content: 'This is a simulated AI response. The actual implementation would integrate with your AI backend.',
        type: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-background-light rounded-lg border border-gray-800">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-primary text-white ml-4'
                    : 'bg-gray-800 text-gray-100 mr-4'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center text-gray-400 text-sm"
          >
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="ml-2">AI is typing...</span>
          </motion.div>
        )}
      </div>

      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about your knowledge..."
              className="input pr-10"
            />
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-700 rounded-full transition-colors"
            >
              <Paperclip className="h-4 w-4 text-gray-400" />
            </button>
          </div>
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onCreateFlashcards}
            className="flex-1"
          >
            Create Flashcards
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onCreateQuiz}
            className="flex-1"
          >
            Create Quiz
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onCreateStudyGuide}
            className="flex-1"
          >
            Create Study Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;