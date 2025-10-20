import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Login = ({ onLogin, onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('holysmokes_users') || '[]');
    const user = users.find(u => u.email === formData.email && u.password === formData.password);

    if (user) {
      onLogin(user);
      toast({
        title: "Welcome back! 🎉",
        description: `Logged in as ${user.name}`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAdminLogin = () => {
    const adminUser = {
      email: 'admin@holysmokes.com',
      name: 'Admin',
      role: 'admin'
    };
    onLogin(adminUser);
    toast({
      title: "Admin Access Granted! 🔐",
      description: "Welcome to the admin dashboard",
    });
  };

  return (
    <>
      <Helmet>
        <title>Login - HolySmokes</title>
        <meta name="description" content="Login to your HolySmokes account" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card p-8 rounded-2xl border border-border shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Login to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-orange-600 hover:opacity-90 text-lg py-6"
              >
                Login
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Don't have an account?{' '}
                <button
                  onClick={() => onNavigate('signup')}
                  className="text-primary hover:underline font-semibold"
                >
                  Sign up
                </button>
              </p>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">Or</span>
                </div>
              </div>

              <Button
                onClick={handleAdminLogin}
                variant="outline"
                className="w-full"
              >
                Quick Admin Login
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;