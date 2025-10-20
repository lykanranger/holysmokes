import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Users, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import DishModal from '@/components/DishModal';

const AdminDashboard = () => {
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [activeTab, setActiveTab] = useState('dishes');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedDishes = JSON.parse(localStorage.getItem('holysmokes_dishes') || '[]');
    const savedOrders = JSON.parse(localStorage.getItem('holysmokes_orders') || '[]');
    const savedUsers = JSON.parse(localStorage.getItem('holysmokes_users') || '[]');
    
    setDishes(savedDishes);
    setOrders(savedOrders);
    setUsers(savedUsers);
  };

  const handleAddDish = (dishData) => {
    const newDish = {
      ...dishData,
      id: Date.now().toString()
    };
    
    const updatedDishes = [...dishes, newDish];
    setDishes(updatedDishes);
    localStorage.setItem('holysmokes_dishes', JSON.stringify(updatedDishes));
    
    toast({
      title: "Dish Added! 🎉",
      description: `${dishData.name} has been added to the menu`,
    });
  };

  const handleEditDish = (dishData) => {
    const updatedDishes = dishes.map(dish =>
      dish.id === editingDish.id ? { ...dishData, id: dish.id } : dish
    );
    
    setDishes(updatedDishes);
    localStorage.setItem('holysmokes_dishes', JSON.stringify(updatedDishes));
    
    toast({
      title: "Dish Updated! ✏️",
      description: `${dishData.name} has been updated`,
    });
  };

  const handleDeleteDish = (dishId) => {
    const updatedDishes = dishes.filter(dish => dish.id !== dishId);
    setDishes(updatedDishes);
    localStorage.setItem('holysmokes_dishes', JSON.stringify(updatedDishes));
    
    toast({
      title: "Dish Deleted",
      description: "The dish has been removed from the menu",
    });
  };

  const openEditModal = (dish) => {
    setEditingDish(dish);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDish(null);
  };

  const stats = [
    {
      icon: UtensilsCrossed,
      label: 'Total Dishes',
      value: dishes.length,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: ShoppingBag,
      label: 'Total Orders',
      value: orders.length,
      color: 'from-primary to-orange-600'
    },
    {
      icon: Users,
      label: 'Total Users',
      value: users.length,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - HolySmokes</title>
        <meta name="description" content="Manage dishes, orders, and users" />
      </Helmet>

      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-6 rounded-2xl border border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="border-b border-border">
                <div className="flex gap-4 p-4">
                  <button
                    onClick={() => setActiveTab('dishes')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                      activeTab === 'dishes'
                        ? 'bg-gradient-to-r from-primary to-orange-600 text-white'
                        : 'hover:bg-accent'
                    }`}
                  >
                    Dishes
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                      activeTab === 'orders'
                        ? 'bg-gradient-to-r from-primary to-orange-600 text-white'
                        : 'hover:bg-accent'
                    }`}
                  >
                    Orders
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'dishes' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Manage Dishes</h2>
                      <Button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gradient-to-r from-primary to-orange-600 hover:opacity-90"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Dish
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {dishes.map((dish) => (
                        <div
                          key={dish.id}
                          className="bg-background p-4 rounded-lg border border-border"
                        >
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                          />
                          <h3 className="font-bold text-lg mb-2">{dish.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {dish.description}
                          </p>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-primary font-bold">${dish.price.toFixed(2)}</span>
                            <span className="text-sm px-2 py-1 bg-accent rounded">
                              {dish.category}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => openEditModal(dish)}
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteDish(dish.id)}
                              variant="destructive"
                              size="sm"
                              className="flex-1"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Order Management</h2>
                    
                    {orders.length === 0 ? (
                      <div className="text-center py-12">
                        <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                        <p className="text-muted-foreground">No orders yet</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div
                            key={order.id}
                            className="bg-background p-6 rounded-lg border border-border"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <p className="font-bold text-lg">Order #{order.id}</p>
                                <p className="text-sm text-muted-foreground">
                                  Customer: {order.userId}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Date: {new Date(order.date).toLocaleString()}
                                </p>
                              </div>
                              <span className="px-4 py-2 bg-green-500/10 text-green-500 rounded-full font-semibold">
                                {order.status}
                              </span>
                            </div>
                            <div className="space-y-2 mb-4">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                  <span>{item.name} x{item.quantity}</span>
                                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                            <div className="pt-4 border-t border-border flex justify-between font-bold text-lg">
                              <span>Total Amount</span>
                              <span className="text-primary">${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <DishModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingDish ? handleEditDish : handleAddDish}
        dish={editingDish}
      />
    </>
  );
};

export default AdminDashboard;