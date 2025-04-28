import { ArrowRight, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Collection } from '../../types';
import { motion } from 'framer-motion';

interface FeaturedCollectionProps {
  collection: Collection;
  index: number;
}

const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({ collection, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link 
        to={`/collections/${collection.id}`}
        className="block bg-background-light border border-gray-800 rounded-lg overflow-hidden hover:bg-background-lighter transition-all duration-300 ease-in-out transform hover:-translate-y-1"
      >
        <div 
          className="h-3" 
          style={{ backgroundColor: collection.color || '#4364F7' }}
        ></div>
        
        <div className="p-4">
          <h3 className="text-md font-semibold mb-1">{collection.title}</h3>
          
          {collection.description && (
            <p className="text-gray-400 text-xs mb-3 line-clamp-2">{collection.description}</p>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              {collection.knowledgeCount} items
            </span>
            
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              Community
            </span>
          </div>
          
          <div className="mt-3 flex items-center text-primary text-xs font-medium">
            <span>Explore</span>
            <ArrowRight className="h-3 w-3 ml-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FeaturedCollection;