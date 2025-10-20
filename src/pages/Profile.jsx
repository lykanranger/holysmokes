import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, Mail, ShoppingBag, Calendar } from 'lucide-react';

const Profile = ({ user, onNavigate }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem('holysmokes_orders') || '[]');
    const userOrders = allOrders.filter(order => order.userId === user.email);
    setOrders(userOrders);
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Profile - HolySmokes</title>
        <meta name="description" content="Manage your HolySmokes profile and view order history" />
      </Helmet>

      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
              My Profile
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card p-8 rounded-2xl border border-border"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    alt={user.name}
                    className="w-20 h-20 rounded-full border-4 border-primary"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground">{user.role === 'admin' ? 'Administrator' : 'Customer'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                    <span>Member since {new Date().getFullYear()}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card p-8 rounded-2xl border border-border"
              >
                <h3 className="text-2xl font-bold mb-6">Order Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="w-6 h-6 text-primary" />
                      <span className="font-medium">Total Orders</span>
                    </div>
                    <span className="text-2xl font-bold text-primary">{orders.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-primary" />
                      <span className="font-medium">Total Spent</span>
                    </div>
                    <span className="text-2xl font-bold text-primary">
                      ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card p-8 rounded-2xl border border-border"
            >
              <h3 className="text-2xl font-bold mb-6">Order History</h3>
              
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">No orders yet</p>
                  <button
                    onClick={() => onNavigate('menu')}
                    className="text-primary hover:underline mt-2"
                  >
                    Start ordering now!
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 bg-background rounded-lg border border-border"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm font-semibold">
                          {order.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>{item.name} x{item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-border flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-primary">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Profile;