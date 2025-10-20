import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import DishCard from '@/components/DishCard';
import { Button } from '@/components/ui/button';

const Menu = ({ addToCart }) => {
  const [dishes, setDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Veg', 'Non-Veg', 'Drinks', 'Desserts'];

  useEffect(() => {
    const savedDishes = localStorage.getItem('holysmokes_dishes');
    if (savedDishes) {
      setDishes(JSON.parse(savedDishes));
    } else {
      const defaultDishes = [
        {
          id: '1',
          name: 'Classic Burger',
          price: 12.99,
          category: 'Non-Veg',
          description: 'Juicy beef patty with fresh lettuce, tomatoes, and our special sauce',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop'
        },
        {
          id: '2',
          name: 'Margherita Pizza',
          price: 14.99,
          category: 'Veg',
          description: 'Fresh mozzarella, tomatoes, and basil on a crispy crust',
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=500&fit=crop'
        },
        {
          id: '3',
          name: 'Grilled Chicken',
          price: 16.99,
          category: 'Non-Veg',
          description: 'Tender grilled chicken breast with herbs and spices',
          image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=500&fit=crop'
        },
        {
          id: '4',
          name: 'Caesar Salad',
          price: 9.99,
          category: 'Veg',
          description: 'Crisp romaine lettuce with parmesan and croutons',
          image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&h=500&fit=crop'
        },
        {
          id: '5',
          name: 'Chocolate Shake',
          price: 6.99,
          category: 'Drinks',
          description: 'Rich and creamy chocolate milkshake',
          image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=500&fit=crop'
        },
        {
          id: '6',
          name: 'Tiramisu',
          price: 8.99,
          category: 'Desserts',
          description: 'Classic Italian dessert with coffee and mascarpone',
          image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=500&fit=crop'
        }
      ];
      localStorage.setItem('holysmokes_dishes', JSON.stringify(defaultDishes));
      setDishes(defaultDishes);
    }
  }, []);

  const filteredDishes = selectedCategory === 'All'
    ? dishes
    : dishes.filter(dish => dish.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Menu - HolySmokes</title>
        <meta name="description" content="Browse our delicious menu featuring burgers, pizzas, salads, drinks, and desserts. Order your favorites now!" />
      </Helmet>

      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
              Our Menu
            </h1>
            <p className="text-muted-foreground text-lg">Discover our delicious offerings</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={selectedCategory === category ? 'bg-gradient-to-r from-primary to-orange-600' : ''}
              >
                {category}
              </Button>
            ))}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredDishes.map((dish) => (
              <motion.div
                key={dish.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <DishCard dish={dish} addToCart={addToCart} />
              </motion.div>
            ))}
          </motion.div>

          {filteredDishes.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No dishes found in this category</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;