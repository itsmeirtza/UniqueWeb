import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, DollarSign, CheckCircle, AlertCircle, Clock, Calendar } from 'lucide-react';
import { mockStudents, mockFees } from '../data/mockData';
import { Fee } from '../types';

const Fees: React.FC = () => {
  const [fees, setFees] = useState<Fee[]>(mockFees);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const getStudentName = (studentId: string) => {
    const student = mockStudents.find(s => s.id === studentId);
    return student ? student.name : 'Unknown';
  };

  const getStudentClass = (studentId: string) => {
    const student = mockStudents.find(s => s.id === studentId);
    return student ? student.class : 'Unknown';
  };

  const filteredFees = fees.filter(fee => {
    const studentName = getStudentName(fee.studentId).toLowerCase();
    const matchesSearch = studentName.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || fee.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'overdue':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Statistics - count only, no amounts
  const totalFeesCount = fees.length;
  const paidFeesCount = fees.filter(fee => fee.status === 'paid').length;
  const pendingFeesCount = fees.filter(fee => fee.status === 'pending').length;
  const overdueFeesCount = fees.filter(fee => fee.status === 'overdue').length;

  const markAsPaid = (feeId: string) => {
    setFees(fees.map(fee => 
      fee.id === feeId 
        ? { ...fee, status: 'paid' as const, paidDate: new Date().toISOString().split('T')[0] }
        : fee
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
      {/* Header */}
      <motion.div 
        variants={cardVariants}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h2 className="text-3xl font-bold text-white gradient-text">Fee Management</h2>
          <p className="text-white/70">Track student payment status and due dates</p>
        </div>
        <motion.button 
          className="neon-button flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Fee Record</span>
        </motion.button>
      </motion.div>

      {/* Statistics - Count only, no amounts */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Records', value: totalFeesCount, icon: DollarSign, color: 'bg-blue-500' },
          { title: 'Paid', value: paidFeesCount, icon: CheckCircle, color: 'bg-green-500' },
          { title: 'Pending', value: pendingFeesCount, icon: Clock, color: 'bg-yellow-500' },
          { title: 'Overdue', value: overdueFeesCount, icon: AlertCircle, color: 'bg-red-500' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.title}
              variants={cardVariants}
              className="card-3d p-6 group cursor-pointer"
              whileHover={{ scale: 1.02, rotateY: 5 }}
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
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <motion.div variants={cardVariants} className="card-3d p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input w-full pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="glass-input"
          >
            <option value="" className="bg-gray-800 text-white">All Status</option>
            <option value="paid" className="bg-gray-800 text-white">Paid ✅</option>
            <option value="pending" className="bg-gray-800 text-white">Pending ⏳</option>
            <option value="overdue" className="bg-gray-800 text-white">Overdue ❌</option>
          </select>
        </div>
      </motion.div>

      {/* Fee Records - NO AMOUNTS SHOWN */}
      <motion.div variants={cardVariants} className="card-3d overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary-400" />
            Payment Status Records
          </h3>
          <p className="text-white/60 text-sm mt-1">Status and payment dates only - amounts are private</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/20 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                  Fee Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                  Last Payment Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredFees.map((fee, index) => (
                <motion.tr 
                  key={fee.id} 
                  className="hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-semibold text-sm">
                          {getStudentName(fee.studentId).charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-white">{getStudentName(fee.studentId)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                    {getStudentClass(fee.studentId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {fee.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                    {new Date(fee.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      fee.status === 'paid' ? 'status-paid' :
                      fee.status === 'overdue' ? 'status-overdue' : 'status-unpaid'
                    }`}>
                      {fee.status === 'paid' ? '✅ Paid' :
                       fee.status === 'overdue' ? '❌ Overdue' : '⏳ Not Paid'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                    {fee.status === 'paid' && fee.paidDate 
                      ? new Date(fee.paidDate).toLocaleDateString()
                      : fee.status === 'overdue'
                      ? 'Overdue'
                      : 'Not paid yet'
                    }
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Fees;