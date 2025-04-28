import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-gray-100 flex flex-col">
      <Header title={title} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            {/* Mobile menu button */}
            <button
              className="md:hidden mb-4 p-2 rounded-md text-gray-400 hover:text-gray-100 hover:bg-gray-800"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;