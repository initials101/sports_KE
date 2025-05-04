import { motion } from 'framer-motion';
import { TrendingUp, Users, Activity, Calendar } from 'lucide-react';

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold text-kenya-black">Dashboard</h1>
          <p className="text-gray-600">Welcome back, Manager</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button className="btn btn-primary">New Report</button>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Users, label: 'Total Players', value: '156', trend: '+12%' },
          { icon: Activity, label: 'Active Transfers', value: '24', trend: '+8%' },
          { icon: Calendar, label: 'Upcoming Matches', value: '8', trend: '0%' },
          { icon: TrendingUp, label: 'Market Value', value: '$2.4M', trend: '+15%' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-kenya-green/10 rounded-lg">
                <stat.icon className="w-6 h-6 text-kenya-green" />
              </div>
              <span className={`text-sm ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-gray-500'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-kenya-black mb-1">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <motion.div
          className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-bold text-kenya-black mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-kenya-green/10 rounded-full flex items-center justify-center mr-4">
                  <Activity className="w-6 h-6 text-kenya-green" />
                </div>
                <div>
                  <h4 className="font-semibold text-kenya-black">New Transfer Request</h4>
                  <p className="text-sm text-gray-600">Player transfer request submitted by AFC Leopards</p>
                </div>
                <span className="ml-auto text-sm text-gray-500">2h ago</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-kenya-black mb-6">Quick Actions</h2>
          <div className="space-y-4">
            {['Add Player', 'Schedule Match', 'View Reports', 'Manage Team'].map((action, index) => (
              <button
                key={index}
                className="w-full p-4 text-left rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
              >
                <span>{action}</span>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;