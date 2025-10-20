import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Profile from '@/pages/Profile';
import AdminDashboard from '@/pages/AdminDashboard';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Cart from '@/components/Cart';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [theme, setTheme] = useState('light');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('holysmokes_user');
    const savedTheme = localStorage.getItem('holysmokes_theme') || 'light';
    const savedCart = localStorage.getItem('holysmokes_cart');
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAdmin(parsedUser.role === 'admin');
    }
    
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('holysmokes_theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAdmin(userData.role === 'admin');
    localStorage.setItem('holysmokes_user', JSON.stringify(userData));
    
    if (userData.role === 'admin') {
      setCurrentPage('admin');
    } else {
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('holysmokes_user');
    setCurrentPage('home');
  };

  const addToCart = (dish) => {
    const existingItem = cartItems.find(item => item.id === dish.id);
    let newCart;
    
    if (existingItem) {
      newCart = cartItems.map(item =>
        item.id === dish.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cartItems, { ...dish, quantity: 1 }];
    }
    
    setCartItems(newCart);
    localStorage.setItem('holysmokes_cart', JSON.stringify(newCart));
  };

  const updateCartQuantity = (dishId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    
    const newCart = cartItems.map(item =>
      item.id === dishId ? { ...item, quantity } : item
    );
    setCartItems(newCart);
    localStorage.setItem('holysmokes_cart', JSON.stringify(newCart));
  };

  const removeFromCart = (dishId) => {
    const newCart = cartItems.filter(item => item.id !== dishId);
    setCartItems(newCart);
    localStorage.setItem('holysmokes_cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('holysmokes_cart');
  };

  const renderPage = () => {
    if (!user && (currentPage === 'profile' || currentPage === 'admin')) {
      return <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} addToCart={addToCart} />;
      case 'menu':
        return <Menu addToCart={addToCart} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'profile':
        return <Profile user={user} onNavigate={setCurrentPage} />;
      case 'admin':
        return isAdmin ? <AdminDashboard /> : <Home onNavigate={setCurrentPage} addToCart={addToCart} />;
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'signup':
        return <Signup onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} addToCart={addToCart} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>HolySmokes - Savor the Flavor 🍔</title>
        <meta name="description" content="Experience premium food ordering with HolySmokes. Browse our delicious menu and order your favorite dishes today!" />
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          user={user}
          isAdmin={isAdmin}
          onLogout={handleLogout}
          theme={theme}
          toggleTheme={toggleTheme}
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setIsCartOpen(true)}
        />
        
        <main className="pt-20">
          {renderPage()}
        </main>

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          updateQuantity={updateCartQuantity}
          removeItem={removeFromCart}
          clearCart={clearCart}
          user={user}
        />

        <Toaster />
      </div>
    </>
  );
}

export default App;