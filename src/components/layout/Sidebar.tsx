import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Brain, CircleUserRound, FileText, FlaskConical, HelpCircle, Home, LayoutGrid, Library, PlusCircle, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SidebarLink } from '../../types';

const mainLinks: SidebarLink[] = [
  { name: 'Home', href: '/', icon: <Home className="h-5 w-5" /> },
  { name: 'My Collections', href: '/collections', icon: <LayoutGrid className="h-5 w-5" /> },
  { name: 'Knowledge', href: '/knowledge', icon: <Brain className="h-5 w-5" /> },
  { name: 'Study', href: '/study', icon: <BookOpen className="h-5 w-5" /> },
  { name: 'Discover', href: '/discover', icon: <Library className="h-5 w-5" /> },
];

const quickLinks: SidebarLink[] = [
  { name: 'Notes', href: '/notes', icon: <FileText className="h-5 w-5" /> },
  { name: 'Flashcards', href: '/flashcards', icon: <FlaskConical className="h-5 w-5" /> },
];

const bottomLinks: SidebarLink[] = [
  { name: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> },
  { name: 'Help', href: '/help', icon: <HelpCircle className="h-5 w-5" /> },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const sidebarClasses = cn(
    'fixed inset-y-0 left-0 z-20 w-64 bg-background border-r border-gray-800 transition-transform duration-300 ease-in-out transform',
    isOpen ? 'translate-x-0' : '-translate-x-full',
    'md:translate-x-0 md:sticky md:top-16 md:h-[calc(100vh-4rem)]'
  );

  const renderLinks = (links: SidebarLink[]) => {
    return links.map((link) => (
      <Link
        key={link.href}
        to={link.href}
        className={cn(
          'sidebar-item',
          location.pathname === link.href && 'sidebar-item-active'
        )}
        onClick={() => onClose()}
      >
        {link.icon}
        <span>{link.name}</span>
      </Link>
    ));
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={sidebarClasses}>
        <div className="flex flex-col h-full py-4 overflow-y-auto">
          <div className="px-4 mb-6">
            <button className="btn btn-primary w-full flex items-center justify-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>New Collection</span>
            </button>
          </div>

          <nav className="flex-1 px-2 space-y-1">
            <div className="space-y-1 mb-6">{renderLinks(mainLinks)}</div>

            <div className="pt-4 border-t border-gray-800">
              <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase">
                Quick Access
              </p>
              <div className="space-y-1">{renderLinks(quickLinks)}</div>
            </div>

            <div className="pt-4 mb-6">
              <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase">
                Recent Collections
              </p>
              <div className="space-y-1">
                <Link
                  to="/collections/1"
                  className="sidebar-item"
                  onClick={() => onClose()}
                >
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="flex-1 truncate">Computer Science</span>
                </Link>
                <Link
                  to="/collections/2"
                  className="sidebar-item"
                  onClick={() => onClose()}
                >
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  <span className="flex-1 truncate">Mathematics</span>
                </Link>
                <Link
                  to="/collections/3"
                  className="sidebar-item"
                  onClick={() => onClose()}
                >
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="flex-1 truncate">Psychology</span>
                </Link>
              </div>
            </div>
          </nav>

          <div className="px-2 mt-auto">
            <div className="space-y-1">{renderLinks(bottomLinks)}</div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;