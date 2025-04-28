import React, { useState } from 'react';
import { PlusCircle, Search, Upload, X } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { motion, AnimatePresence } from 'framer-motion';
import { quizzes } from '../data/mockData';

const QuizzesPage: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <Layout title="Quizzes">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="sm:max-w-xs flex-1">
            <Input
              placeholder="Search quizzes..."
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          
          <Button 
            leftIcon={<PlusCircle className="h-4 w-4" />}
            onClick={() => setIsCreating(true)}
          >
            Create Quiz
          </Button>
        </div>

        <AnimatePresence>
          {isCreating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <div className="bg-background-light rounded-lg border border-gray-800 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Create Quiz</h3>
                  <button
                    onClick={() => setIsCreating(false)}
                    className="p-1 hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Knowledge Base:</p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Select knowledge..."
                      className="flex-1"
                    />
                    <Button variant="outline" leftIcon={<Upload className="h-4 w-4" />}>
                      Upload
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Long / Short Responses</span>
                    <div className="relative inline-flex">
                      <input type="checkbox" className="toggle" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">True / False</span>
                    <div className="relative inline-flex">
                      <input type="checkbox" className="toggle" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Multiple Choice</span>
                    <div className="relative inline-flex">
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fill in the Blank</span>
                    <div className="relative inline-flex">
                      <input type="checkbox" className="toggle" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreating(false)}
                  >
                    Cancel
                  </Button>
                  <Button>Create Quiz</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-background-light rounded-lg border border-gray-800 p-4 hover:bg-background-lighter transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{quiz.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{quiz.questionCount} questions</span>
                {quiz.lastCompleted && (
                  <span>Last taken {new Date(quiz.lastCompleted).toLocaleDateString()}</span>
                )}
              </div>
              <Button className="w-full">Start Quiz</Button>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default QuizzesPage;