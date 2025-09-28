import React from 'react';
import { Users, GraduationCap, BookOpen, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { mockStudents, mockTeachers, mockClasses, mockFees } from '../data/mockData';

const Dashboard: React.FC = () => {
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

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to Unique School System</h2>
        <p className="text-blue-100">Manage your school efficiently with our comprehensive system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{activity.activity}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">Add Student</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <GraduationCap className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">Add Teacher</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">Mark Attendance</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <DollarSign className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">Collect Fee</p>
            </button>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Schedule</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Morning Assembly</p>
              <p className="text-sm text-gray-600">All students and staff</p>
            </div>
            <span className="text-sm font-medium text-blue-600">8:00 AM</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Mathematics - Class 10-A</p>
              <p className="text-sm text-gray-600">Dr. Sarah Ahmad</p>
            </div>
            <span className="text-sm font-medium text-green-600">9:00 AM</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Physics - Class 9-B</p>
              <p className="text-sm text-gray-600">Prof. Muhammad Iqbal</p>
            </div>
            <span className="text-sm font-medium text-purple-600">10:30 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;