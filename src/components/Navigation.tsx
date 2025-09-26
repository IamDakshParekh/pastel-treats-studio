import React from 'react';
import { ShoppingBag, Menu, X, User, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems, toggleCart } = useCart();
  const { user, signOut } = useAuth();

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { name: 'Products', href: '#products' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center sweet-shadow">
              <span className="text-xl">🍭</span>
            </div>
            <h1 className="font-sweet text-2xl text-primary">Sweet Dreams</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-smooth font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Cart and Auth Buttons */}
          <div className="flex items-center space-x-4">
            {/* Auth Buttons */}
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/profile">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:bg-primary/10"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:bg-primary/10"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="sm"
                    className="btn-sweet"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="relative hover:bg-primary/10 transition-smooth"
            >
              <ShoppingBag className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold bounce-in">
                  {getTotalItems()}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border fade-in-up">
            <div className="flex flex-col space-y-4 pt-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-smooth font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Auth Links */}
              <div className="border-t border-border pt-4 mt-4">
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/profile"
                      className="text-foreground hover:text-primary transition-smooth font-medium py-2 flex items-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-foreground hover:text-primary transition-smooth font-medium py-2 text-left"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/login"
                      className="text-foreground hover:text-primary transition-smooth font-medium py-2 flex items-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="text-primary hover:text-primary-hover transition-smooth font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;