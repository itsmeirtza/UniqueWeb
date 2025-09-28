import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  DollarSign,
  Menu,
  X,
  School,
  LogOut
} from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext'; // Removed for demo

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // const { logout, currentUser } = useAuth(); // Removed for demo

  const currentPage = location.pathname.replace('/', '') || 'dashboard';

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'students', label: 'Students', icon: Users, path: '/students' },
    { id: 'teachers', label: 'Teachers', icon: GraduationCap, path: '/teachers' },
    { id: 'classes', label: 'Classes', icon: BookOpen, path: '/classes' },
    { id: 'attendance', label: 'Attendance', icon: Calendar, path: '/attendance' },
    { id: 'grades', label: 'Grades', icon: BarChart3, path: '/grades' },
    { id: 'fees', label: 'Fees', icon: DollarSign, path: '/fees' },
  ];

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     navigate('/login');
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //   }
  // }; // Removed for demo

  return (
    <div className="min-h-screen bg-cyber-gradient">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-64 glass-sidebar lg:translate-x-0"
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center shadow-neon">
              <School className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Your School Name</span>
          </motion.div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`sidebar-item w-full mb-2 rounded-lg group ${
                  isActive ? 'active' : ''
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 transition-all duration-200 ${
                  isActive ? 'text-primary-400' : 'group-hover:text-primary-400'
                }`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute right-0 top-0 bottom-0 w-1 bg-primary-400 rounded-l-lg"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-4 left-0 right-0 px-6">
          <div className="glass-card p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">T</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">Teacher Demo</p>
                <p className="text-white/60 text-xs">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card border-b border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
              
              <h1 className="text-2xl font-bold text-white capitalize">
                {currentPage === 'dashboard' ? 'Dashboard' : currentPage}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.div 
                className="glass-card px-4 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-white font-medium text-sm">Welcome Back!</p>
                <p className="text-white/60 text-xs">Teacher Portal</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Page content */}
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;