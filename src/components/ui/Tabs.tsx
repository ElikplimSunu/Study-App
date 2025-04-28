import React from 'react';
import { cn } from '../../lib/utils';
import { TabItem } from '../../types';

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (value: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
}) => {
  return (
    <div className={cn('flex border-b border-gray-800', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'tab',
            activeTab === tab.value ? 'tab-active' : 'text-gray-400'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;