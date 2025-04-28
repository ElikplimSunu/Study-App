import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, Moon, Plus, Sun, Upload } from 'lucide-react';
import Button from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';
import Avatar from '../ui/Avatar';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Study App' }) => {
  const { theme, toggleTheme } = useTheme();
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="text-xl font-bold text-gray-100 flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">S</span>
            </div>
            {title}
          </Link>
          
          {title !== 'Study App' && (
            <h1 className="text-xl font-semibold hidden md:block">{title}</h1>
          )}
        </div>

        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="input pl-10 w-full bg-background-lighter"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-400 hover:text-gray-100 hover:bg-gray-800"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          
          <Button 
            variant="primary" 
            leftIcon={<Upload className="h-4 w-4" />}
            className="hidden md:flex"
          >
            Upload Knowledge
          </Button>
          
          <Button 
            variant="primary" 
            className="md:hidden"
            size="sm"
          >
            <Upload className="h-4 w-4" />
          </Button>
          
          <button className="p-2 rounded-md text-gray-400 hover:text-gray-100 hover:bg-gray-800 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          
          <div className="ml-2">
            <Avatar fallback="U" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;