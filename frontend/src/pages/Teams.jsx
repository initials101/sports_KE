import { motion } from 'framer-motion';
import { MapPin, Users, Trophy } from 'lucide-react';

function Teams() {
  const teams = [
    {
      name: 'Gor Mahia',
      location: 'Nairobi',
      founded: 1968,
      league: 'Kenya Premier League',
      players: 28,
      trophies: 19,
      logo: 'https://images.pexels.com/photos/3621085/pexels-photo-3621085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      name: 'AFC Leopards',
      location: 'Nairobi',
      founded: 1964,
      league: 'Kenya Premier League',
      players: 26,
      trophies: 12,
      logo: 'https://images.pexels.com/photos/3621099/pexels-photo-3621099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    // Add more teams as needed
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Teams Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-kenya-black mb-4">Kenyan Football Clubs</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the rich history and achievements of Kenya's top football clubs.
        </p>
      </motion.div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teams.map((team, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="h-48 relative overflow-hidden">
              <img
                src={team.logo}
                alt={team.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold">{team.name}</h3>
                <div className="flex items-center text-sm">
                  <MapPin size={16} className="mr-1" />
                  {team.location}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Founded</p>
                  <p className="font-semibold">{team.founded}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-kenya-green">
                    <Users size={20} />
                  </div>
                  <p className="font-semibold">{team.players}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-kenya-red">
                    <Trophy size={20} />
                  </div>
                  <p className="font-semibold">{team.trophies}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{team.league}</span>
                <button className="btn btn-primary text-sm">View Team</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Teams;