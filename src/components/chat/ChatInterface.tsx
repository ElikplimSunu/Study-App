import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Home,
  BookOpen,
  Layers,
  FileText,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";

interface ChatInterfaceProps {
  onCreateFlashcards?: () => void;
  onCreateQuiz?: () => void;
  onCreateStudyGuide?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onCreateFlashcards,
  onCreateQuiz,
  onCreateStudyGuide,
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    {
      text?: string;
      isUser: boolean;
      type: "text" | "file" | "image";
      fileName?: string;
      fileUrl?: string;
      fileType?: string;
      timestamp: Date;
      sender: string;
    }[]
  >([
    {
      text: "Hi! How can I help you with Computer Science today?",
      isUser: false,
      type: "text",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      sender: "AI",
    },
    {
      text: "Can you explain what a binary tree is?",
      isUser: true,
      type: "text",
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
      sender: "You",
    },
    {
      text: "A binary tree is a tree data structure in which each node has at most two children, referred to as the left child and the right child.",
      isUser: false,
      type: "text",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      sender: "AI",
    },
    {
      fileName: "lecture_notes.pdf",
      fileUrl: "",
      fileType: "application/pdf",
      isUser: true,
      type: "file",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      sender: "You",
    },
    {
      text: "I've received your file 'lecture_notes.pdf'. Would you like me to summarize it?",
      isUser: false,
      type: "text",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      sender: "AI",
    },
    {
      fileName: "binary_tree.png",
      fileUrl: "",
      fileType: "image/png",
      isUser: false,
      type: "image",
      timestamp: new Date(Date.now() - 1000 * 60 * 1),
      sender: "AI",
    },
  ]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [resizing, setResizing] = useState(false);
  const [splitPosition, setSplitPosition] = useState(60); // percentage - chat takes more space by default
  const [activeTab, setActiveTab] = useState("knowledge");

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Add this function to handle file uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newMessages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type.startsWith("image/") ? "image" : "file";
      const fileUrl = URL.createObjectURL(file);
      newMessages.push({
        fileName: file.name,
        fileUrl,
        fileType: file.type,
        isUser: true,
        type: fileType as "file" | "image",
        timestamp: new Date(),
        sender: "You",
      });
    }
    setMessages((prev) => [...prev, ...newMessages]);
    e.target.value = "";
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle resize functionality
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizing || !chatContainerRef.current) return;

      const containerRect = chatContainerRef.current.getBoundingClientRect();
      const newPosition =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;

      // Limit the resize range (30% to 80%)
      const limitedPosition = Math.min(Math.max(newPosition, 30), 80);
      setSplitPosition(limitedPosition);
    };

    const handleMouseUp = () => {
      setResizing(false);
    };

    if (resizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !isSidebarCollapsed &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsSidebarCollapsed(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarCollapsed]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message with all required fields
    setMessages([
      ...messages,
      {
        text: message,
        isUser: true,
        type: "text",
        timestamp: new Date(),
        sender: "You",
      },
    ]);

    // Simulate AI response (in a real app, you'd call your API here)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: `This is a simulated response to: "${message}"`,
          isUser: false,
          type: "text",
          timestamp: new Date(),
          sender: "AI",
        },
      ]);
    }, 1000);

    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const sidebarItems = [
    { icon: <Home size={20} />, label: "Dashboard", id: "dashboard" },
    { icon: <BookOpen size={20} />, label: "Subjects", id: "subjects" },
    { icon: <Layers size={20} />, label: "Flashcards", id: "flashcards" },
    { icon: <FileText size={20} />, label: "Notes", id: "notes" },
    { icon: <Settings size={20} />, label: "Settings", id: "settings" },
  ];

  const tabItems = [
    { label: "Knowledge", id: "knowledge" },
    { label: "Flashcards", id: "flashcards" },
    { label: "Quizzes", id: "quizzes" },
    { label: "Study Guides", id: "guides" },
    { label: "Notes", id: "notes" },
  ];

  return (
    <div className="fixed inset-0 bg-background z-50 flex">
      {/* Collapsed sidebar indicator */}
      <div className="w-12 bg-background-lighter border-r border-gray-800 flex flex-col items-center py-4">
        <button
          className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mb-4 hover:bg-primary-600 transition-colors"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          aria-label={
            isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
          }
        >
          {isSidebarCollapsed ? (
            <Menu className="h-4 w-4 text-white" />
          ) : (
            <X className="h-4 w-4 text-white" />
          )}
        </button>

        {/* Sidebar icons - simplified versions of your main navigation */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xs text-white">C</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
            <span className="text-xs text-white">M</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
            <span className="text-xs text-white">P</span>
          </div>
        </div>
      </div>

      {/* Expandable sidebar */}
      <AnimatePresence>
        {!isSidebarCollapsed && (
          <motion.div
            ref={sidebarRef}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full bg-background-light border-r border-gray-800 overflow-hidden z-20"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Study App</h2>
                <button
                  onClick={() => setIsSidebarCollapsed(true)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-1">
                {sidebarItems.map((item) => (
                  <button key={item.id} className="sidebar-item w-full">
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  Recent Subjects
                </h3>
                <div className="space-y-2">
                  <div className="sidebar-item sidebar-item-active">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xs text-white">C</span>
                    </div>
                    <span>Computer Science</span>
                  </div>
                  <div className="sidebar-item">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-xs text-white">M</span>
                    </div>
                    <span>Mathematics</span>
                  </div>
                  <div className="sidebar-item">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <span className="text-xs text-white">P</span>
                    </div>
                    <span>Physics</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main container with resizable panels */}
      <div ref={chatContainerRef} className="flex flex-1 overflow-hidden">
        {/* Left panel - Chat */}
        <div
          className="h-full flex flex-col bg-background-light"
          style={{ width: `${splitPosition}%` }}
        >
          {/* Chat header */}
          <div className="border-b border-gray-800 p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-lg font-bold">C</span>
              </div>
              <div>
                <h2 className="font-bold">Computer_science</h2>
                <p className="text-sm text-gray-400">
                  Chat with your knowledge
                </p>
              </div>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                <p>Ask a question about your Computer Science knowledge</p>
              </div>
            )}

            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  msg.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 mb-1 ${
                    msg.isUser
                      ? "bg-primary text-white"
                      : "bg-background-lighter border border-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold">{msg.sender}</span>
                    <span className="text-xs text-gray-400">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {msg.type === "text" && <div>{msg.text}</div>}
                  {msg.type === "file" && (
                    <div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        <span>{msg.fileName}</span>
                      </div>
                      <a
                        href={msg.fileUrl}
                        download={msg.fileName}
                        className="text-xs text-primary underline"
                      >
                        Download
                      </a>
                    </div>
                  )}
                  {msg.type === "image" && (
                    <div>
                      <img
                        src={msg.fileUrl || "/placeholder-image.png"}
                        alt={msg.fileName}
                        className="max-w-xs max-h-40 rounded mt-2"
                      />
                      <div className="text-xs text-gray-400">
                        {msg.fileName}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-gray-800 p-4 bg-background-light">
            <div className="flex items-end gap-2">
              <div className="flex-1 rounded-xl bg-background-lighter border border-gray-700 focus-within:border-primary shadow-sm transition-all duration-150 flex flex-col">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your question or message..."
                  className="w-full bg-transparent border-0 p-3 focus:ring-0 focus:outline-none text-sm min-h-[40px] max-h-[200px] rounded-xl resize-none text-white placeholder-gray-400"
                  rows={1}
                />
                <div className="flex items-center px-3 py-2 border-t border-gray-800 gap-2">
                  <button
                    className="text-gray-400 hover:text-primary transition-colors"
                    onClick={handleAttachmentClick}
                    title="Attach file"
                    type="button"
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*,application/pdf,.txt,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                  />
                </div>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="h-10 w-10 p-0 flex items-center justify-center bg-primary hover:bg-primary-600 rounded-full transition-colors"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Resize handle */}
        <div
          ref={resizeHandleRef}
          className="w-1 bg-gray-800 hover:bg-primary cursor-col-resize relative group"
          onMouseDown={() => setResizing(true)}
        >
          <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-primary/10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-gray-600 rounded-full opacity-0 group-hover:opacity-100"></div>
        </div>

        {/* Right panel - Knowledge/Content with tabs */}
        <div
          className="h-full flex flex-col overflow-hidden"
          style={{ width: `${100 - splitPosition}%` }}
        >
          {/* Tabs */}
          <div className="border-b border-gray-800 flex">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? "tab-active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Search bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search..."
                className="input w-full pl-10"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>

            {/* Knowledge items */}
            <div className="space-y-4">
              <div className="bg-background-light border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-md">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-center text-gray-400 text-sm">
                  2023-04-20_SUMMARY.txt
                </p>
              </div>

              {/* Add more knowledge items as needed */}
              <div className="bg-background-light border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-md">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-center text-gray-400 text-sm">
                  ALGORITHMS_NOTES.pdf
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

