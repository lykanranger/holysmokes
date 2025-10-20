import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const DishCard = ({ dish, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(dish);
    toast({
      title: "Added to Cart! 🎉",
      description: `${dish.name} has been added to your cart`,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-card rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            dish.category === 'Veg' ? 'bg-green-500/90' : 'bg-red-500/90'
          } text-white`}>
            {dish.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{dish.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{dish.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${dish.price.toFixed(2)}</span>
          <Button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-primary to-orange-600 hover:opacity-90"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DishCard;