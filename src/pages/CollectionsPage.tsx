import React from 'react';
import { PlusCircle, Search } from 'lucide-react';
import { collections } from '../data/mockData';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import CollectionCard from '../components/home/CollectionCard';
import Input from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';

const CollectionsPage: React.FC = () => {
  return (
    <Layout title="My Collections">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="sm:max-w-xs flex-1">
          <Input
            placeholder="Search collections..."
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>
        
        <Button leftIcon={<PlusCircle className="h-4 w-4" />}>
          New Collection
        </Button>
      </div>
      
      {collections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <CollectionCard key={collection.id} collection={collection} index={index} />
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: collections.length * 0.1 }}
          >
            <Card 
              className="flex items-center justify-center h-full border-2 border-dashed border-gray-700 bg-transparent hover:border-gray-600 hover:bg-gray-800/20 transition-colors cursor-pointer"
            >
              <div className="p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <PlusCircle className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-300 mb-2">Create Collection</h3>
                <p className="text-sm text-gray-500">
                  Organize your knowledge into a new collection
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      ) : (
        <Card className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <PlusCircle className="h-8 w-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No collections yet</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Collections help you organize your knowledge and study materials. Create your first collection to get started.
          </p>
          <Button leftIcon={<PlusCircle className="h-4 w-4" />}>
            Create First Collection
          </Button>
        </Card>
      )}
    </Layout>
  );
};

export default CollectionsPage;