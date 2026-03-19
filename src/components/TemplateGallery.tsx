'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Palette, Eye, Sparkles, Tag } from 'lucide-react';
import { getTemplatesByCategory, getCategoryById, templates as allTemplates } from '@/data/templates';
import { EventCategory, Template } from '@/types';
import { adminApi } from '@/lib/api';

interface TemplateGalleryProps {
  categoryId?: EventCategory | 'all';
  onBack?: () => void;
  onSelectTemplate: (template: Template) => void;
  showAllHeader?: boolean;
  filterBy?: string;
  templateType?: 'standard' | 'premium' | 'all';
}

export function TemplateGallery({
  categoryId = 'all',
  onBack,
  onSelectTemplate,
  showAllHeader = true,
  filterBy,
  templateType = 'all'
}: TemplateGalleryProps) {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await adminApi.getConfig();
        setConfig(data);
      } catch (e) {
        console.error("Error loading gallery config:", e);
      }
    };
    loadConfig();
  }, []);
  const category = categoryId !== 'all' ? getCategoryById(categoryId) : null;
  let templates = categoryId === 'all'
    ? allTemplates
    : getTemplatesByCategory(categoryId);

  if (filterBy) {
    templates = templates.filter(t =>
      t.name.toLowerCase().includes(filterBy.toLowerCase()) ||
      t.description.toLowerCase().includes(filterBy.toLowerCase())
    );
  }

  if (templateType === 'standard') {
    templates = templates.filter(t => !t.backgroundVideo && !t.isPremium);
  } else if (templateType === 'premium') {
    templates = templates.filter(t => t.backgroundVideo || t.isPremium);
  }

  const styleLabels: Record<string, string> = {
    elegant: 'Elegante',
    modern: 'Moderno',
    playful: 'Divertido',
    minimal: 'Minimalista',
    rustic: 'Rústico'
  };

  const layoutLabels: Record<string, string> = {
    centered: 'Centrado',
    left: 'Izquierda',
    right: 'Derecha',
    full: 'Completo'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      {showAllHeader && (category || categoryId === 'all') && (
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button variant="ghost" size="icon" onClick={onBack}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <div className="flex items-center gap-3">
                <span className="text-3xl">{category?.icon || '⭐'}</span>
                <div>
                  <h1 className="text-xl font-bold">{category?.name || 'Todas las Plantillas'}</h1>
                  <p className="text-sm text-gray-500">{templates.length} diseños disponibles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Templates Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                {/* Preview */}
                <div
                  className="aspect-[4/3] relative overflow-hidden"
                  style={{ backgroundColor: template.defaultColors.background }}
                >
                  {(template.backgroundImage || template.backgroundVideo) && (
                    <div className="absolute inset-0 z-0">
                      {template.backgroundVideo && (
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          key={template.backgroundVideo}
                          className="absolute inset-0 w-full h-full object-cover"
                        >
                          <source src={template.backgroundVideo} type="video/mp4" />
                        </video>
                      )}
                      {template.backgroundImage && (
                        <div
                          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${template.backgroundVideo ? 'opacity-0' : ''}`}
                          style={{ backgroundImage: `url(${template.backgroundImage})` }}
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40" />
                    </div>
                  )}
                  {/* Decorative elements based on style */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8 relative z-10" style={{ textShadow: template.backgroundImage ? '0 2px 4px rgba(0,0,0,0.5)' : 'none' }}>
                      <div
                        className="text-sm uppercase tracking-wider mb-4 opacity-80"
                        style={{ color: template.backgroundImage ? '#FFFFFF' : template.defaultColors.text }}
                      >
                        {template.style === 'elegant' && '✨'}
                        {template.style === 'modern' && '◇'}
                        {template.style === 'playful' && '🎈'}
                        {template.style === 'minimal' && '○'}
                        {template.style === 'rustic' && '🌿'}
                        {' '}Vista Previa
                      </div>
                      <h3
                        className="text-2xl md:text-3xl font-bold mb-2"
                        style={{
                          color: template.backgroundImage ? '#FFFFFF' : template.defaultColors.text,
                          fontFamily: template.defaultFont
                        }}
                      >
                        {template.name}
                      </h3>
                      <p
                        className="text-sm opacity-90"
                        style={{ color: template.backgroundImage ? '#FFFFFF' : template.defaultColors.text }}
                      >
                        {template.preview}
                      </p>
                      <div
                        className="mt-6 w-16 h-1 mx-auto rounded-full"
                        style={{ backgroundColor: template.defaultColors.accent }}
                      />
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="gap-2 bg-white text-gray-900 hover:bg-gray-100"
                      onClick={() => onSelectTemplate(template)}
                    >
                      <Palette className="w-4 h-4" />
                      Elegir esta
                    </Button>
                  </div>

                  {/* Style and Price badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                    <Badge
                      variant="secondary"
                      className="backdrop-blur-sm bg-white/80 shadow-sm border-0 font-bold text-[10px] uppercase tracking-wider"
                    >
                      {styleLabels[template.style]}
                    </Badge>

                    {/* Dynamic Price Badge */}
                    {config && (
                      <div className="flex flex-col gap-1.5 items-start">
                        <Badge
                          className={`shadow-lg border-0 font-bold text-[10px] py-1 px-2.5 flex items-center gap-1.5 ${template.backgroundVideo || template.isPremium
                              ? 'bg-amber-500 text-white'
                              : 'bg-emerald-500 text-white'
                            }`}
                        >
                          <Tag className="w-3 h-3" />
                          <span>
                            ${(Number(template.backgroundVideo || template.isPremium ? config.pricePremium : config.priceStandard) * (config.exchangeRate || 1)).toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ARS
                          </span>
                        </Badge>
                        
                        <div className="px-2 py-0.5 rounded-md bg-black/20 backdrop-blur-sm text-[9px] text-white font-medium">
                           {(template.backgroundVideo || template.isPremium ? config.pricePremium : config.priceStandard)} USD
                        </div>
                      </div>
                    )}

                    {(template.backgroundVideo || template.isPremium) && (
                      <Badge
                        className="bg-indigo-600/90 backdrop-blur-sm text-white border-0 shadow-lg text-[10px] uppercase tracking-tighter"
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        Efectos Live
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{template.name}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{template.description}</p>
                    </div>
                  </div>

                  {/* Info tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {layoutLabels[template.layout]}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {template.defaultFont}
                    </span>
                    {categoryId === 'all' && (
                      <span className="text-xs px-2 py-1 rounded-full bg-rose-50 text-rose-600 font-medium">
                        {getCategoryById(template.categoryId)?.name}
                      </span>
                    )}
                  </div>

                  {/* Action button */}
                  <Button
                    className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 shadow-sm"
                    onClick={() => onSelectTemplate(template)}
                  >
                    Personalizar esta plantilla
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {templates.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold mb-2">No se encontraron diseños</h3>
            <p className="text-gray-500">Prueba con otra búsqueda o categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
}
