'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { categories } from '@/data/templates';
import { Card, CardContent } from '@/components/ui/card';
import { EventCategory } from '@/types';

interface CategoryGridProps {
  onSelectCategory: (categoryId: EventCategory) => void;
}

export function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
  const [clickedCategory, setClickedCategory] = useState<string | null>(null);

  const handleClick = (categoryId: EventCategory) => {
    setClickedCategory(categoryId);
    // Small delay for visual feedback
    setTimeout(() => {
      onSelectCategory(categoryId);
      setClickedCategory(null);
    }, 150);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Elige tu tipo de evento
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Selecciona la categoría que mejor se adapte a tu celebración
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className={`group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
                  clickedCategory === category.id ? 'ring-4 ring-rose-400 ring-offset-2' : ''
                }`}
                onClick={() => handleClick(category.id)}
              >
                <CardContent className="p-0">
                  <div
                    className="aspect-square flex flex-col items-center justify-center p-6 relative"
                    style={{
                      background: `linear-gradient(135deg, ${category.colors.primary}15, ${category.colors.secondary}30)`
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${category.colors.primary}25, ${category.colors.secondary}50)`
                      }}
                    />
                    <span className="text-5xl mb-3 relative z-10 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </span>
                    <h3 className="font-semibold text-center relative z-10 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500 text-center mt-1 relative z-10 hidden md:block">
                      {category.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
