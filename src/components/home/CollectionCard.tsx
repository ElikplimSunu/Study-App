import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Code, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Collection } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { formatDate } from '../../lib/utils';

interface CollectionCardProps {
  collection: Collection;
  index: number;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, index }) => {
  const iconMap: Record<string, React.ReactNode> = {
    'laptop-code': <Code />,
    'sigma': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 7V4H6l6 8-6 8h12v-3"></path></svg>,
    'brain': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path></svg>,
    'trending-up': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>,
    'code': <Code />,
    'globe': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link to={`/collections/${collection.id}`}>
        <Card 
          hoverable 
          className="h-full transition-all duration-300 ease-in-out transform hover:-translate-y-1"
        >
          <CardContent className="p-0">
            <div className="p-6">
              <div 
                className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" 
                style={{ backgroundColor: collection.color || '#4364F7' }}
              >
                <span className="text-white">
                  {iconMap[collection.icon as string] || <BookOpen />}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{collection.title}</h3>
              
              {collection.description && (
                <p className="text-gray-400 text-sm mb-4">{collection.description}</p>
              )}
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {collection.knowledgeCount} items
                </span>
                
                <span className="flex items-center gap-1">
                  {collection.isPublic ? (
                    <>
                      <Users className="h-4 w-4" />
                      Public
                    </>
                  ) : (
                    <>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="h-4 w-4"
                      >
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      Private
                    </>
                  )}
                </span>
              </div>
            </div>
            
            <div className="border-t border-gray-800 p-4 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Created {formatDate(collection.createdAt)}
              </span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default CollectionCard;