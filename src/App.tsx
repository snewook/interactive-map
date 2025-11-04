import { useState } from 'react';
import { InteractiveMap } from './components/InteractiveMap';
import { BusinessDetailDialog } from './components/BusinessDetailDialog';
import { MapLegend } from './components/MapLegend';
import { businesses } from './data/businesses';
import { Business } from './types/business';
import { motion } from 'motion/react';
import { Map, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b-2 border-gray-300 sticky top-0 z-30 shadow-md"
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div 
                className="w-16 h-16 rounded-md flex items-center justify-center shadow-lg"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <Map className="w-9 h-9 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 style={{ fontFamily: 'var(--font-heading)' }}>Карта профессионального пути</h1>
                <p className="text-sm text-gray-600 mt-1">Образовательные экскурсии на предприятия-партнёры техникума</p>
              </div>
            </div>

            <div 
              className="hidden sm:flex items-center gap-3 text-sm px-5 py-3 rounded-md shadow-sm"
              style={{ backgroundColor: 'var(--accent)', color: 'white' }}
            >
              <Sparkles className="w-5 h-5" />
              <span>{businesses.length} предприятий</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[1fr,340px] gap-8">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-gray-300"
            style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}
          >
            <div className="w-full h-full p-8">
              <InteractiveMap
                businesses={businesses}
                onBusinessClick={setSelectedBusiness}
                selectedBusinessId={selectedBusiness?.id}
              />
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            <MapLegend />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200"
            >
              <h3 className="mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>
                Как пользоваться картой
              </h3>
              <ul className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                <li className="flex gap-3">
                  <span 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    1
                  </span>
                  <span>Нажмите на маркер предприятия на карте</span>
                </li>
                <li className="flex gap-3">
                  <span 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    2
                  </span>
                  <span>Изучите экскурсии, технологии и историю предприятия</span>
                </li>
                <li className="flex gap-3">
                  <span 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    3
                  </span>
                  <span>Узнайте, какие профессии можно получить</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
              className="rounded-lg shadow-lg p-6 text-white"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <div className="flex items-start gap-3 mb-3">
                <Sparkles className="w-7 h-7 mt-1 flex-shrink-0" />
                <h3 className="text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  О проекте
                </h3>
              </div>
              <p className="text-sm leading-relaxed opacity-90">
                Познакомьтесь с ведущими предприятиями региона. Каждая экскурсия — это шаг к выбору будущей профессии и успешной карьере.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Business Detail Dialog */}
      <BusinessDetailDialog
        business={selectedBusiness}
        onClose={() => setSelectedBusiness(null)}
      />
    </div>
  );
}
