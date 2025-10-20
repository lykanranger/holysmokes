import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, Award, Users } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We pour our heart into every dish we create'
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Only the finest ingredients make it to your plate'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building connections through great food'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - HolySmokes</title>
        <meta name="description" content="Learn about HolySmokes - our story, mission, and passion for delivering exceptional food experiences." />
      </Helmet>

      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
              Our Story
            </h1>

            <div className="prose prose-lg dark:prose-invert mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-card p-8 rounded-2xl border border-border"
              >
                <p className="text-lg leading-relaxed mb-6">
                  Welcome to <span className="font-bold text-primary">HolySmokes</span>, where culinary passion meets exceptional service. Our journey began with a simple belief: great food has the power to bring people together and create unforgettable moments.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Founded by food enthusiasts who dreamed of revolutionizing the dining experience, HolySmokes has grown from a small kitchen to a beloved destination for food lovers. We're committed to sourcing the finest ingredients, crafting innovative recipes, and delivering them with care.
                </p>
                <p className="text-lg leading-relaxed">
                  Every dish we serve tells a story of dedication, creativity, and love for the culinary arts. Join us on this delicious journey and experience the difference that passion makes.
                </p>
              </motion.div>
            </div>

            <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-card p-8 rounded-2xl border border-border text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;