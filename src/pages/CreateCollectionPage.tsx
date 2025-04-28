import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import ChatInterface from '../components/chat/ChatInterface';
import CreateCollectionModal from '../components/knowledge/CreateCollectionModal';
import UploadModal from '../components/knowledge/UploadModal';

const CreateCollectionPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [collectionName, setCollectionName] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Step 1: What are you studying?
  const handleNext = (name: string) => {
    setCollectionName(name);
    setStep(2);
    setUploadModalOpen(true);
  };

  // Step 2: Upload Knowledge
  const handleUploadClose = () => {
    setUploadModalOpen(false);
    setShowSuccess(true);
    // Optionally, redirect or show chat, etc.
  };

  return (
    <Layout title="Create Collection">
      <ChatInterface />
      <CreateCollectionModal
        isOpen={step === 1}
        onClose={() => window.history.back()}
        onNext={handleNext}
      >
        {/* Step indicator can be passed as children if needed */}
      </CreateCollectionModal>
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={handleUploadClose}
      />
      {/* Step indicator overlay */}
      {(step === 1 || uploadModalOpen) && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pointer-events-none">
          <div className="mt-24 flex gap-2">
            <span className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-primary' : 'bg-gray-600'} transition-colors`}></span>
            <span className={`w-2 h-2 rounded-full ${step === 2 && uploadModalOpen ? 'bg-primary' : 'bg-gray-600'} transition-colors`}></span>
          </div>
        </div>
      )}
      {/* Optional: Success message */}
      {showSuccess && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center">
          <div className="bg-background-light border border-gray-800 rounded-lg shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Collection Created!</h2>
            <p className="text-gray-400 mb-4">Your collection "{collectionName}" was created successfully.</p>
            <button
              className="btn btn-primary px-6 py-2 mt-2"
              onClick={() => setShowSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CreateCollectionPage; 