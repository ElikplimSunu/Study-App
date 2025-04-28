import { File, FileText, Image, Play, Trash2 } from 'lucide-react';
import React from 'react';
import { Knowledge } from '../../types';
import { formatDate } from '../../lib/utils';
import { motion } from 'framer-motion';

interface KnowledgeItemProps {
  item: Knowledge;
  index: number;
}

const KnowledgeItem: React.FC<KnowledgeItemProps> = ({ item, index }) => {
  const getIcon = () => {
    switch (item.type) {
      case 'pdf':
        return <File className="h-5 w-5 text-red-500" />;
      case 'text':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <Play className="h-5 w-5 text-green-500" />;
      case 'image':
        return <Image className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="bg-background-light border border-gray-800 rounded-lg overflow-hidden hover:bg-background-lighter transition-colors duration-200"
    >
      <div className="p-4 flex items-center gap-4">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-200 truncate">{item.title}</h4>
          <p className="text-xs text-gray-400 mt-1">
            Added {formatDate(item.createdAt)} • {item.fileSize}
          </p>
        </div>
        <button className="flex-shrink-0 p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
          <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-400" />
        </button>
      </div>
    </motion.div>
  );
};

export default KnowledgeItem;