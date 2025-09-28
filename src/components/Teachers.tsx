import React, { useState } from 'react';
import { Plus, Search, CreditCard as Edit, Trash2, Eye, Phone, Mail, DollarSign } from 'lucide-react';
import { mockTeachers } from '../data/mockData';
import { Teacher } from '../types';

const Teachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Teachers Management</h2>
          <p className="text-gray-600">Manage teaching staff and their information</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Teacher</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search teachers by name, subject, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option value="">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
          </select>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold text-lg">
                  {teacher.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{teacher.name}</h3>
                <p className="text-sm text-gray-600">{teacher.subject}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium w-20">Experience:</span>
                <span>{teacher.experience}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span className="truncate">{teacher.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span>{teacher.phone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="w-4 h-4 mr-2" />
                <span>Rs. {teacher.salary.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedTeacher(teacher)}
                className="flex-1 bg-green-50 text-green-600 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center space-x-1"
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

      {/* Teacher Details Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Teacher Details</h3>
                <button
                  onClick={() => setSelectedTeacher(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-2xl">
                    {selectedTeacher.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">{selectedTeacher.name}</h4>
                  <p className="text-gray-600">{selectedTeacher.subject} Teacher</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="font-semibold text-gray-800">Personal Information</h5>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Email:</span>
                      <p className="text-gray-800">{selectedTeacher.email}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Phone:</span>
                      <p className="text-gray-800">{selectedTeacher.phone}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Join Date:</span>
                      <p className="text-gray-800">{selectedTeacher.joinDate}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="font-semibold text-gray-800">Professional Information</h5>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Subject:</span>
                      <p className="text-gray-800">{selectedTeacher.subject}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Qualification:</span>
                      <p className="text-gray-800">{selectedTeacher.qualification}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Experience:</span>
                      <p className="text-gray-800">{selectedTeacher.experience}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Salary:</span>
                      <p className="text-gray-800">Rs. {selectedTeacher.salary.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-800 mb-2">Performance Summary</h5>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">95%</p>
                    <p className="text-sm text-gray-600">Attendance</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">4.8</p>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">25</p>
                    <p className="text-sm text-gray-600">Students</p>
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

export default Teachers;