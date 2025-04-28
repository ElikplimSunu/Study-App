import React, { useState } from 'react';
import { PlusCircle, Search, Upload, X } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { motion, AnimatePresence } from 'framer-motion';
import { studyGuides } from '../data/mockData';

const StudyGuidesPage: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <Layout title="Study Guides">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="sm:max-w-xs flex-1">
            <Input
              placeholder="Search study guides..."
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          
          <Button 
            leftIcon={<PlusCircle className="h-4 w-4" />}
            onClick={() => setIsCreating(true)}
          >
            Create Study Guide
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
                  <h3 className="text-lg font-semibold">Create Study Guide</h3>
                  <button
                    onClick={() => setIsCreating(false)}
                    className="p-1 hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Select Knowledge Base:</p>
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
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreating(false)}
                  >
                    Cancel
                  </Button>
                  <Button>Create Study Guide</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studyGuides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-background-light rounded-lg border border-gray-800 p-4 hover:bg-background-lighter transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">{guide.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{guide.content}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Created {new Date(guide.createdAt).toLocaleDateString()}</span>
                <Button variant="ghost" size="sm">View Guide</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default StudyGuidesPage;