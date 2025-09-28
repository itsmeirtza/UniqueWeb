import React, { useState } from 'react';
import { Calendar, Search, Check, X, Clock, Users } from 'lucide-react';
import { mockStudents, mockAttendance } from '../data/mockData';
import { Attendance as AttendanceType } from '../types';

const Attendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [attendance, setAttendance] = useState<AttendanceType[]>(mockAttendance);

  const classStudents = mockStudents.filter(student => student.class === selectedClass);

  const getAttendanceStatus = (studentId: string, date: string) => {
    const record = attendance.find(a => a.studentId === studentId && a.date === date);
    return record ? record.status : 'not_marked';
  };

  const markAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    const existingIndex = attendance.findIndex(
      a => a.studentId === studentId && a.date === selectedDate
    );

    if (existingIndex >= 0) {
      const updated = [...attendance];
      updated[existingIndex] = { ...updated[existingIndex], status };
      setAttendance(updated);
    } else {
      const newRecord: AttendanceType = {
        id: Date.now().toString(),
        studentId,
        date: selectedDate,
        status,
      };
      setAttendance([...attendance, newRecord]);
    }
  };

  const getAttendanceStats = () => {
    const todayAttendance = attendance.filter(a => a.date === selectedDate);
    const present = todayAttendance.filter(a => a.status === 'present').length;
    const absent = todayAttendance.filter(a => a.status === 'absent').length;
    const late = todayAttendance.filter(a => a.status === 'late').length;
    const total = classStudents.length;

    return { present, absent, late, total, percentage: total > 0 ? (present / total) * 100 : 0 };
  };

  const stats = getAttendanceStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Attendance Management</h2>
          <p className="text-gray-600">Mark and track student attendance</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="10-A">Class 10-A</option>
              <option value="9-B">Class 9-B</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Present</p>
              <p className="text-2xl font-bold text-green-600">{stats.present}</p>
            </div>
            <Check className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
            </div>
            <X className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Late</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Attendance</p>
              <p className="text-2xl font-bold text-blue-600">{stats.percentage.toFixed(1)}%</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            {selectedClass} - {new Date(selectedDate).toLocaleDateString()}
          </h3>
        </div>
        
        <div className="p-4">
          <div className="space-y-3">
            {classStudents.map((student) => {
              const status = getAttendanceStatus(student.id, selectedDate);
              return (
                <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{student.name}</h4>
                      <p className="text-sm text-gray-600">Roll: {student.rollNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => markAttendance(student.id, 'present')}
                      className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-1 ${
                        status === 'present'
                          ? 'bg-green-600 text-white'
                          : 'bg-green-50 text-green-600 hover:bg-green-100'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>Present</span>
                    </button>
                    <button
                      onClick={() => markAttendance(student.id, 'late')}
                      className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-1 ${
                        status === 'late'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      <span>Late</span>
                    </button>
                    <button
                      onClick={() => markAttendance(student.id, 'absent')}
                      className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-1 ${
                        status === 'absent'
                          ? 'bg-red-600 text-white'
                          : 'bg-red-50 text-red-600 hover:bg-red-100'
                      }`}
                    >
                      <X className="w-4 h-4" />
                      <span>Absent</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;