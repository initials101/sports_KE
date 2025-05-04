import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, TrendingUp } from 'lucide-react';

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-kenya-black mb-6">
          <span className="bg-gradient-to-r from-kenya-green to-kenya-red bg-clip-text text-transparent">
            Discover Kenyan Football
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your gateway to Kenya's football talent. Connect with players, clubs, and scouts across the nation.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="btn btn-primary px-8 py-3 text-lg">
            Explore Teams
          </button>
          <button className="btn btn-secondary px-8 py-3 text-lg">
            View Players
          </button>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        {[
          { icon: Trophy, label: 'Active Clubs', value: '180+' },
          { icon: Users, label: 'Registered Players', value: '3,000+' },
          { icon: Calendar, label: 'Matches Played', value: '500+' },
          { icon: TrendingUp, label: 'Transfer Success', value: '95%' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <stat.icon className="w-12 h-12 mx-auto mb-4 text-kenya-green" />
            <h3 className="text-3xl font-bold text-kenya-black mb-2">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: 'Player Profiles',
            description: 'Comprehensive profiles with performance metrics, career history, and real-time statistics.',
            color: 'from-kenya-green to-emerald-600',
          },
          {
            title: 'Transfer Market',
            description: 'Streamlined transfer process with transparent negotiations and market valuations.',
            color: 'from-kenya-red to-rose-600',
          },
          {
            title: 'Scout Network',
            description: 'Connect with professional scouts and discover emerging talent across Kenya.',
            color: 'from-kenya-black to-gray-800',
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className={`bg-gradient-to-br ${feature.color} p-8 h-full text-white`}>
              <h2 className="text-2xl font-bold mb-4">{feature.title}</h2>
              <p className="text-gray-100">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Home;