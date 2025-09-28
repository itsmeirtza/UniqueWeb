import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, GraduationCap, BookOpen, DollarSign, TrendingUp, Calendar, Sparkles } from 'lucide-react';
import { mockStudents, mockTeachers, mockClasses, mockFees } from '../data/mockData';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const totalStudents = mockStudents.length;
  const totalTeachers = mockTeachers.length;
  const totalClasses = mockClasses.length;
  const pendingFees = mockFees.filter(fee => fee.status === 'pending').length;

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Total Teachers',
      value: totalTeachers,
      icon: GraduationCap,
      color: 'bg-green-500',
      change: '+5%',
    },
    {
      title: 'Total Classes',
      value: totalClasses,
      icon: BookOpen,
      color: 'bg-purple-500',
      change: '+8%',
    },
    {
      title: 'Pending Fees',
      value: pendingFees,
      icon: DollarSign,
      color: 'bg-red-500',
      change: '-3%',
    },
  ];

  const recentActivities = [
    { id: 1, activity: 'New student Ahmed Ali enrolled', time: '2 hours ago', type: 'enrollment' },
    { id: 2, activity: 'Fee payment received from Fatima Khan', time: '4 hours ago', type: 'payment' },
    { id: 3, activity: 'Attendance marked for Class 10-A', time: '6 hours ago', type: 'attendance' },
    { id: 4, activity: 'New teacher Dr. Sarah Ahmad joined', time: '1 day ago', type: 'staff' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Section */}
      <motion.div 
        variants={cardVariants}
        className="glass-card p-8 rounded-2xl shadow-neon overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-neon"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold gradient-text">Welcome to Your School Name</h2>
              <p className="text-white/80 text-lg">Advanced School Management Dashboard</p>
            </div>
          </div>
          <p className="text-white/70">Manage your educational institution with cutting-edge technology and comprehensive analytics</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={index} 
              variants={cardVariants}
              className="card-3d p-6 group cursor-pointer"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-white/70 mb-1">{stat.title}</p>
                  <motion.p 
                    className="text-3xl font-bold text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <motion.div 
                  className={`${stat.color} p-3 rounded-xl shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 text-accent-400 mr-1" />
                <span className="text-sm text-accent-400 font-medium">{stat.change}</span>
                <span className="text-sm text-white/60 ml-1">from last month</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div variants={cardVariants} className="card-3d p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary-400" />
              Recent Activities
            </h3>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div 
                key={activity.id} 
                className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-3 h-3 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full mt-1 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">{activity.activity}</p>
                  <p className="text-xs text-white/60 mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={cardVariants} className="card-3d p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-secondary-400" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Users, label: 'Add Student', color: 'from-blue-500 to-blue-600', path: '/students' },
              { icon: GraduationCap, label: 'Add Teacher', color: 'from-green-500 to-green-600', path: '/teachers' },
              { icon: Calendar, label: 'Mark Attendance', color: 'from-purple-500 to-purple-600', path: '/attendance' },
              { icon: DollarSign, label: 'Collect Fee', color: 'from-red-500 to-red-600', path: '/fees' }
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button 
                  key={action.label}
                  className={`p-4 bg-gradient-to-r ${action.color} rounded-xl hover:shadow-neon transition-all duration-300 group`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  onClick={() => navigate(action.path)}
                >
                  <Icon className="w-8 h-8 text-white mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-white">{action.label}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Today's Schedule */}
      <motion.div variants={cardVariants} className="card-3d p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-accent-400" />
          Today's Schedule
        </h3>
        <div className="space-y-4">
          {[
            { title: 'Morning Assembly', subtitle: 'All students and staff', time: '8:00 AM', color: 'from-blue-500/20 to-blue-600/20', timeColor: 'text-blue-400' },
            { title: 'Mathematics - Class 10-A', subtitle: 'Dr. Sarah Ahmad', time: '9:00 AM', color: 'from-green-500/20 to-green-600/20', timeColor: 'text-green-400' },
            { title: 'Physics - Class 9-B', subtitle: 'Prof. Muhammad Iqbal', time: '10:30 AM', color: 'from-purple-500/20 to-purple-600/20', timeColor: 'text-purple-400' }
          ].map((schedule, index) => (
            <motion.div 
              key={schedule.title}
              className={`flex items-center justify-between p-4 bg-gradient-to-r ${schedule.color} rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <p className="font-semibold text-white">{schedule.title}</p>
                <p className="text-sm text-white/70">{schedule.subtitle}</p>
              </div>
              <span className={`text-sm font-bold ${schedule.timeColor} bg-white/10 px-3 py-1 rounded-lg`}>
                {schedule.time}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;