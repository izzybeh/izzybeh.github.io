import { Link, useLocation } from 'react-router';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Articles', path: '/articles' },
    { name: 'Podcast', path: '/podcast' },
    { name: 'Tools', path: '/tools' },
    { name: 'About', path: '/about' },
    { name: 'Intranet', path: '/intranet' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-warm-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-lg sm:text-xl text-ink hover:text-seafoam-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            MoneyBeh
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const isActive = item.path === '/' 
                ? location.pathname === '/' 
                : location.pathname.startsWith(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-warm-gray-700 hover:text-seafoam-600 transition-colors ${
                    isActive ? 'text-seafoam-600' : ''
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <a 
              href="#" 
              className="bg-seafoam-500 hover:bg-seafoam-600 text-paper px-6 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              Get the App
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-warm-gray-700 hover:text-seafoam-600"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-warm-gray-200 py-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = item.path === '/' 
                  ? location.pathname === '/' 
                  : location.pathname.startsWith(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-2 text-warm-gray-700 hover:text-seafoam-600 transition-colors ${
                      isActive ? 'text-seafoam-600 bg-seafoam-50 rounded-lg' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <a 
                href="#" 
                className="mx-4 mt-2 bg-seafoam-500 hover:bg-seafoam-600 text-paper px-6 py-3 rounded-lg transition-colors text-center"
              >
                Get the App
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}