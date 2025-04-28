import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { X } from 'lucide-react';

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: (collectionName: string) => void;
}

const MAX_LENGTH = 50;

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({ isOpen, onClose, onNext }) => {
  const [collectionName, setCollectionName] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-background-light rounded-lg shadow-xl border border-gray-800 max-w-md w-full max-h-[90vh] overflow-auto"
          >
            <div className="flex items-center justify-between border-b border-gray-800 p-4">
              <h2 className="text-lg font-semibold">What are you studying?</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-gray-400 hover:text-gray-100 hover:bg-gray-800"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-gray-400 text-sm mb-4">
                This can be the name of your class, reading, textbook, video, topic, resume, character, etc.
              </p>
              <div className="mb-6">
                <input
                  type="text"
                  className="w-full rounded-md bg-background-lighter border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent p-3 text-base"
                  placeholder="e.g. Psychology"
                  maxLength={MAX_LENGTH}
                  value={collectionName}
                  onChange={e => setCollectionName(e.target.value)}
                  autoFocus
                />
                <div className="flex justify-end text-xs text-gray-500 mt-1">{collectionName.length}/{MAX_LENGTH}</div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => onNext(collectionName)}
                  disabled={!collectionName.trim()}
                >
                  Next
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateCollectionModal; 