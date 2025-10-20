import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DishCard from '@/components/DishCard';

const Home = ({ onNavigate, addToCart }) => {
  const [featuredDishes, setFeaturedDishes] = useState([]);

  useEffect(() => {
    const dishes = JSON.parse(localStorage.getItem('holysmokes_dishes') || '[]');
    setFeaturedDishes(dishes.slice(0, 3));
  }, []);

  return (
    <>
      <Helmet>
        <title>HolySmokes - Savor the Flavor 🍔</title>
        <meta name="description" content="Experience premium food ordering with HolySmokes. Browse our delicious menu and order your favorite dishes today!" />
      </Helmet>

      <div className="min-h-screen">
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-orange-500/5 to-transparent" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                  <Flame className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-primary">Premium Food Delivery</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-orange-600 to-primary bg-clip-text text-transparent">
                  Savor the Flavor with HolySmokes
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Experience culinary excellence delivered right to your doorstep. Fresh, delicious, and unforgettable.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => onNavigate('menu')}
                    size="lg"
                    className="bg-gradient-to-r from-primary to-orange-600 hover:opacity-90 text-lg px-8"
                  >
                    Explore Menu
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    onClick={() => onNavigate('about')}
                    variant="outline"
                    size="lg"
                    className="text-lg px-8"
                  >
                    Our Story
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
        </section>

        {featuredDishes.length > 0 && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Dishes</h2>
                <p className="text-muted-foreground text-lg">Handpicked favorites just for you</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {featuredDishes.map((dish, index) => (
                  <motion.div
                    key={dish.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <DishCard dish={dish} addToCart={addToCart} />
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button
                  onClick={() => onNavigate('menu')}
                  size="lg"
                  variant="outline"
                  className="text-lg"
                >
                  View Full Menu
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Home;