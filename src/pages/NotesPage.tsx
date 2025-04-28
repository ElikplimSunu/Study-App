import React, { useState } from 'react';
import { PlusCircle, Search, X } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { motion, AnimatePresence } from 'framer-motion';
import { notes } from '../data/mockData';

const NotesPage: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  return (
    <Layout title="Notes">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="sm:max-w-xs flex-1">
            <Input
              placeholder="Search notes..."
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          
          <Button 
            leftIcon={<PlusCircle className="h-4 w-4" />}
            onClick={() => setIsCreating(true)}
          >
            New Note
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
                  <h3 className="text-lg font-semibold">Create New Note</h3>
                  <button
                    onClick={() => setIsCreating(false)}
                    className="p-1 hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <Input
                  placeholder="Note title..."
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="mb-4"
                />
                
                <textarea
                  placeholder="Start typing here..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full h-48 bg-background-lighter border border-gray-800 rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreating(false)}
                  >
                    Cancel
                  </Button>
                  <Button>Save Note</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          {notes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-background-light rounded-lg border border-gray-800 p-4 hover:bg-background-lighter transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{note.content}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Last updated {new Date(note.updatedAt).toLocaleDateString()}</span>
                <Button variant="ghost" size="sm">View Note</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default NotesPage;