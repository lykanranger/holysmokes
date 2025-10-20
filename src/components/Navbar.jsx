import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = ({ currentPage, onNavigate, user, isAdmin, onLogout, theme, toggleTheme, cartCount, onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', page: 'home' },
    { name: 'Menu', page: 'menu' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">HS</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
              HolySmokes
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === link.page ? 'text-primary' : 'text-foreground/70'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            {!isAdmin && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onCartClick}
                className="rounded-full relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            )}

            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => onNavigate(isAdmin ? 'admin' : 'profile')}
                  className="gap-2"
                >
                  <User className="w-4 h-4" />
                  {user.name}
                </Button>
                <Button variant="ghost" size="icon" onClick={onLogout}>
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => onNavigate('login')}
                className="hidden md:flex bg-gradient-to-r from-primary to-orange-600 hover:opacity-90"
              >
                Login
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-border pt-4"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => {
                    onNavigate(link.page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-lg transition-colors ${
                    currentPage === link.page
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-accent'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              {user ? (
                <>
                  <button
                    onClick={() => {
                      onNavigate(isAdmin ? 'admin' : 'profile');
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left px-4 py-2 rounded-lg hover:bg-accent"
                  >
                    {isAdmin ? 'Dashboard' : 'Profile'}
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left px-4 py-2 rounded-lg hover:bg-accent text-destructive"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    onNavigate('login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-primary to-orange-600"
                >
                  Login
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;