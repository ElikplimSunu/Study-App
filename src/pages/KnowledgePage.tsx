import React, { useState } from 'react';
import { Filter, Grid, List, Plus, Search, SortAsc, Upload } from 'lucide-react';
import { knowledgeItems } from '../data/mockData';
import Layout from '../components/layout/Layout';
import { TabItem } from '../types';
import Tabs from '../components/ui/Tabs';
import Button from '../components/ui/Button';
import KnowledgeItem from '../components/home/KnowledgeItem';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import Input from '../components/ui/Input';
import UploadModal from '../components/knowledge/UploadModal';

const tabs: TabItem[] = [
  { label: 'Knowledge', value: 'knowledge' },
  { label: 'Flashcards', value: 'flashcards' },
  { label: 'Quizzes', value: 'quizzes' },
  { label: 'Study Guides', value: 'study-guides' },
  { label: 'Notes', value: 'notes' },
];

const KnowledgePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('knowledge');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  return (
    <Layout title="Knowledge">
      <div className="mb-8">
        <Tabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
          className="mb-4"
        />
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search knowledge..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              leftIcon={<Filter className="h-4 w-4" />}
              className="hidden sm:flex"
            >
              Filter
            </Button>
            <Button 
              variant="outline" 
              leftIcon={<SortAsc className="h-4 w-4" />}
              className="hidden sm:flex"
            >
              Sort
            </Button>
            <div className="flex bg-background-light border border-gray-800 rounded-md">
              <button
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-100'} rounded-l-md`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-5 w-5" />
              </button>
              <button
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-100'} rounded-r-md`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-5 w-5" />
              </button>
            </div>
            <Button 
              leftIcon={<Upload className="h-4 w-4" />}
              onClick={() => setUploadModalOpen(true)}
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
      
      {knowledgeItems.length > 0 ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
          {knowledgeItems.map((item, index) => (
            <KnowledgeItem key={item.id} item={item} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No knowledge found</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Start by uploading documents, PDFs, videos, or any content you want to learn from.
            </p>
            <Button 
              leftIcon={<Upload className="h-4 w-4" />}
              onClick={() => setUploadModalOpen(true)}
            >
              Upload Knowledge
            </Button>
          </Card>
        </motion.div>
      )}
      
      <UploadModal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />
    </Layout>
  );
};

export default KnowledgePage;