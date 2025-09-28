import React, { useState } from 'react';
import { Plus, Search, CreditCard as Edit, Trash2, Eye, Users, BookOpen } from 'lucide-react';
import { mockClasses, mockTeachers } from '../data/mockData';
import { Class } from '../types';

const Classes: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTeacherName = (teacherId: string) => {
    const teacher = mockTeachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : 'Not Assigned';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Classes Management</h2>
          <p className="text-gray-600">Manage class sections and their details</p>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Class</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search classes by name or section..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <div key={cls.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{cls.name}</h3>
                  <p className="text-sm text-gray-600">Section {cls.section}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Class Teacher:</span>
                <span className="font-medium text-gray-800">{getTeacherName(cls.teacherId)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Students:</span>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-800">{cls.studentCount}</span>
                </div>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Subjects:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {cls.subjects.slice(0, 3).map((subject, index) => (
                    <span key={index} className="bg-purple-50 text-purple-600 px-2 py-1 rounded text-xs">
                      {subject}
                    </span>
                  ))}
                  {cls.subjects.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      +{cls.subjects.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedClass(cls)}
                className="flex-1 bg-purple-50 text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center space-x-1"
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
              <button className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button className="bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Class Details Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Class Details</h3>
                <button
                  onClick={() => setSelectedClass(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    {selectedClass.name} - Section {selectedClass.section}
                  </h4>
                  <p className="text-gray-600">Class Information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="font-semibold text-gray-800">Basic Information</h5>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Class Name:</span>
                      <p className="text-gray-800">{selectedClass.name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Section:</span>
                      <p className="text-gray-800">{selectedClass.section}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Class Teacher:</span>
                      <p className="text-gray-800">{getTeacherName(selectedClass.teacherId)}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Total Students:</span>
                      <p className="text-gray-800">{selectedClass.studentCount}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="font-semibold text-gray-800">Subjects</h5>
                  <div className="space-y-2">
                    {selectedClass.subjects.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-gray-800">{subject}</span>
                        <span className="text-xs text-gray-500">Active</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-800 mb-3">Class Statistics</h5>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{selectedClass.studentCount}</p>
                    <p className="text-sm text-gray-600">Students</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{selectedClass.subjects.length}</p>
                    <p className="text-sm text-gray-600">Subjects</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">92%</p>
                    <p className="text-sm text-gray-600">Avg Attendance</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-semibold text-gray-800">Recent Activities</h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-gray-800">Mathematics test scheduled</span>
                    <span className="text-xs text-blue-600">Today</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-gray-800">Attendance marked</span>
                    <span className="text-xs text-green-600">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm text-gray-800">New assignment posted</span>
                    <span className="text-xs text-purple-600">Yesterday</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;