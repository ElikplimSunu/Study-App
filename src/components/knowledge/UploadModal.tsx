import { Upload, X } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check file size
    const maxSize = 500 * 1024 * 1024; // 500MB
    const maxAudioSize = 25 * 1024 * 1024; // 25MB
    const maxImageSize = 20 * 1024 * 1024; // 20MB

    const isAudio = file.type.startsWith('audio/');
    const isImage = file.type.startsWith('image/');

    if (isAudio && file.size > maxAudioSize) {
      alert('Audio files must be less than 25MB');
      return;
    }

    if (isImage && file.size > maxImageSize) {
      alert('Image files must be less than 20MB');
      return;
    }

    if (file.size > maxSize) {
      alert('File must be less than 500MB');
      return;
    }

    setSelectedFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const createTextFile = (text: string): File => {
    const blob = new Blob([text], { type: 'text/plain' });
    return new File([blob], 'pasted-text.txt', { type: 'text/plain' });
  };

  const handleUpload = async () => {
    if (!selectedFile && !pastedText) return;

    setIsUploading(true);
    try {
      // Here you would typically upload the file to your server
      // For now, we'll just simulate an upload
      const fileToUpload = selectedFile || createTextFile(pastedText);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // After successful upload
      setSelectedFile(null);
      setPastedText('');
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handlePasteText = () => {
    setIsPasteModalOpen(true);
  };

  const handlePasteSubmit = () => {
    if (pastedText.trim()) {
      setIsPasteModalOpen(false);
    }
  };

  const supportedFileTypes = [
    '.pdf', '.docx', '.pptx', '.txt', '.doc', '.mp4', '.mp3',
    '.md', '.xls', '.csv', '.ppt', '.pages', '.epub', '.xlsx', '.html', '.webm', '.png',
    '.jpeg', '.webp', '.jpg', '.heic'
  ].join(', ');

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
            className="bg-background-light rounded-lg shadow-xl border border-gray-800 max-w-lg w-full max-h-[90vh] overflow-auto"
          >
            <div className="flex items-center justify-between border-b border-gray-800 p-4">
              <h2 className="text-lg font-semibold">Upload Knowledge</h2>
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
                Upload new knowledge - Study App helps you learn anything and everything with unlimited knowledge uploads
              </p>
              
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  dragActive ? 'border-primary bg-primary/10' : 'border-gray-700'
                } transition-colors duration-200`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                aria-label="Upload file"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept={supportedFileTypes}
                  onChange={handleFileSelect}
                  aria-label="File input"
                />
                
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-800 mb-4">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
                
                {selectedFile ? (
                  <div className="text-gray-300">
                    <p className="font-medium mb-2">{selectedFile.name}</p>
                    <p className="text-sm text-gray-400">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : pastedText ? (
                  <div className="text-gray-300">
                    <p className="font-medium mb-2">pasted-text.txt</p>
                    <p className="text-sm text-gray-400">
                      {pastedText.length} characters
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-300 mb-2">Drag & drop here, or <span className="text-primary font-medium">browse</span></p>
                    
                    <p className="text-xs text-gray-500 mb-2">
                      Supported files: {supportedFileTypes}
                    </p>
                    
                    <p className="text-xs text-gray-500">
                      Maximum file size: 500MB, audio size: 25MB, images: 20MB
                    </p>
                    
                    <p className="text-xs text-gray-400 mt-4">
                      If on mobile, press browse above.
                    </p>
                  </>
                )}
              </div>
              
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-gray-700 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M9 18V5l12-2v13"></path><path d="M9 9c4.5-1 3.5-1 8 0"></path><circle cx="5" cy="18" r="3"></circle><circle cx="17" cy="16" r="3"></circle></svg>
                  </div>
                  <p className="text-sm">Google Drive</p>
                  <span className="ml-auto text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">
                    Coming Soon
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-gray-700 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M4 11.5s1-1 3.5-1 4.5 1 7.5 1 5-1 5-1V6.5s-1 1-5 1-6-2-10-2v15s1-1 5-1 6 2 10 2v-4s-1 1-5 1-5.5-1-7.5-1-3.5 1-3.5 1"></path></svg>
                  </div>
                  <p className="text-sm">YouTube</p>
                  <span className="ml-auto text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">
                    Coming Soon
                  </span>
                </div>
                
                <button 
                  className="mt-2 text-sm text-gray-300 flex items-center justify-center p-2 border border-gray-700 rounded-md hover:bg-gray-800"
                  aria-label="Paste text"
                  onClick={handlePasteText}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  Paste Text
                </button>
              </div>
              
              <div className="mt-6">
                <div className="text-sm text-gray-400 flex justify-between mb-2">
                  <span>Knowledge Limit</span>
                  <span>0 / Unlimited</span>
                </div>
                
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border-t border-gray-800">
              <Button variant="outline" onClick={onClose}>
                Back
              </Button>
              
              <Button 
                variant="primary" 
                disabled={!selectedFile && !pastedText || isUploading}
                onClick={handleUpload}
              >
                {isUploading ? 'Uploading...' : 'Done'}
              </Button>
            </div>
          </motion.div>

          {/* Paste Text Modal */}
          <AnimatePresence>
            {isPasteModalOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              >
                <div className="bg-background-light rounded-lg shadow-xl border border-gray-800 max-w-lg w-full">
                  <div className="flex items-center justify-between border-b border-gray-800 p-4">
                    <h2 className="text-lg font-semibold">Paste Text</h2>
                    <button 
                      onClick={() => setIsPasteModalOpen(false)}
                      className="p-1 rounded-md text-gray-400 hover:text-gray-100 hover:bg-gray-800"
                      aria-label="Close modal"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <textarea
                      className="w-full h-48 p-3 rounded-md bg-background-lighter border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Paste your text here or type it out..."
                      value={pastedText}
                      onChange={(e) => setPastedText(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border-t border-gray-800">
                    <Button variant="outline" onClick={() => setIsPasteModalOpen(false)}>
                      Cancel
                    </Button>
                    
                    <Button 
                      variant="primary" 
                      disabled={!pastedText.trim()}
                      onClick={handlePasteSubmit}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UploadModal;