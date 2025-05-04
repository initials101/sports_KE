import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

function Players() {
  const players = [
    {
      name: 'Michael Olunga',
      position: 'Striker',
      club: 'Al-Duhail',
      age: 29,
      image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      name: 'Victor Wanyama',
      position: 'Midfielder',
      club: 'CF Montréal',
      age: 32,
      image: 'https://images.pexels.com/photos/3621121/pexels-photo-3621121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    // Add more players as needed
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search players..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kenya-green"
            />
          </div>
          <button className="btn btn-secondary flex items-center space-x-2">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="h-48 overflow-hidden">
              <img
                src={player.image}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-kenya-black mb-2">{player.name}</h3>
              <div className="flex items-center justify-between text-gray-600 mb-4">
                <span>{player.position}</span>
                <span>Age: {player.age}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{player.club}</span>
                <button className="btn btn-primary text-sm">View Profile</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Players;