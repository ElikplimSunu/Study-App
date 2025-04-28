import React, { useState } from 'react';
import { BookOpen, PlusCircle, Upload } from 'lucide-react';
import { collections, featuredCollections, knowledgeItems } from '../data/mockData';
import Layout from '../components/layout/Layout';
import CollectionCard from '../components/home/CollectionCard';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import KnowledgeItem from '../components/home/KnowledgeItem';
import FeaturedCollection from '../components/home/FeaturedCollection';
import UploadModal from '../components/knowledge/UploadModal';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout title="Study App">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Learning Companion</h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Upload any content — Study App helps you learn faster with custom answers, flashcards, quizzes, and study guides in seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button 
              size="lg" 
              leftIcon={<Upload className="h-5 w-5" />}
              onClick={() => setUploadModalOpen(true)}
            >
              Upload Knowledge
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              leftIcon={<PlusCircle className="h-5 w-5" />}
              onClick={() => navigate('/collections/create')}
            >
              Create Collection
            </Button>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-2 lg:col-span-3"
          >
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-8 border border-gray-800">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold mb-3">Welcome to Study App</h2>
                  <p className="text-gray-300 mb-4">
                    Your personal learning assistant that helps you learn faster and remember more.
                    Get started by creating your first collection or uploading knowledge.
                  </p>
                  <div className="space-x-3">
                    <Button 
                      variant="primary"
                      leftIcon={<BookOpen className="h-4 w-4" />}
                    >
                      Quick Start Guide
                    </Button>
                    <Button variant="outline">Watch Demo</Button>
                  </div>
                </div>
                <div className="flex-shrink-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">S</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Your Collections</h2>
            <Button 
              variant="outline" 
              size="sm" 
              leftIcon={<PlusCircle className="h-4 w-4" />}
              onClick={() => navigate('/collections/create')}
            >
              New Collection
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection, index) => (
              <CollectionCard key={collection.id} collection={collection} index={index} />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Knowledge</h2>
              <Button 
                variant="outline" 
                size="sm" 
                leftIcon={<Upload className="h-4 w-4" />}
                onClick={() => setUploadModalOpen(true)}
              >
                Upload
              </Button>
            </div>
            
            <div className="space-y-3">
              {knowledgeItems.map((item, index) => (
                <KnowledgeItem key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-6">Featured Collections</h2>
            <div className="space-y-4">
              {featuredCollections.map((collection, index) => (
                <FeaturedCollection key={collection.id} collection={collection} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <UploadModal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />
    </Layout>
  );
};

export default HomePage;