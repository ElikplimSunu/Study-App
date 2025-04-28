import React, { useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import ChatInterface from '../components/chat/ChatInterface';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const KnowledgeViewPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('knowledge');

  const handleCreateFlashcards = () => {
    navigate('/flashcards/create');
  };

  const handleCreateQuiz = () => {
    navigate('/quizzes/create');
  };

  const handleCreateStudyGuide = () => {
    navigate('/study-guides/create');
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Left panel - Knowledge viewer */}
        <div className="w-1/2 border-r border-gray-800 p-4">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="hover:bg-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-semibold">Computer Science Notes</h2>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                TXT
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                DOCX
              </Button>
            </div>
          </div>

          <div className="bg-background-lighter rounded-lg p-4 h-[calc(100vh-12rem)] overflow-y-auto">
            {/* Content viewer */}
            <div className="prose prose-invert max-w-none">
              <p>Your knowledge content will be displayed here...</p>
            </div>
          </div>
        </div>

        {/* Right panel - Chat interface */}
        <div className="w-1/2 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button
                className={`tab ${activeTab === 'knowledge' && 'tab-active'}`}
                onClick={() => setActiveTab('knowledge')}
              >
                Knowledge
              </button>
              <button
                className={`tab ${activeTab === 'flashcards' && 'tab-active'}`}
                onClick={() => setActiveTab('flashcards')}
              >
                Flashcards
              </button>
              <button
                className={`tab ${activeTab === 'quizzes' && 'tab-active'}`}
                onClick={() => setActiveTab('quizzes')}
              >
                Quizzes
              </button>
              <button
                className={`tab ${activeTab === 'study-guides' && 'tab-active'}`}
                onClick={() => setActiveTab('study-guides')}
              >
                Study Guides
              </button>
              <button
                className={`tab ${activeTab === 'notes' && 'tab-active'}`}
                onClick={() => setActiveTab('notes')}
              >
                Notes
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[calc(100vh-12rem)]"
          >
            <ChatInterface
              onCreateFlashcards={handleCreateFlashcards}
              onCreateQuiz={handleCreateQuiz}
              onCreateStudyGuide={handleCreateStudyGuide}
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default KnowledgeViewPage;