import { Student, Teacher, Class, Attendance, Grade, Fee } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Ahmed Ali',
    email: 'ahmed@example.com',
    phone: '03001234567',
    class: '10-A',
    rollNumber: '001',
    dateOfBirth: '2008-05-15',
    address: 'Karachi, Pakistan',
    parentName: 'Ali Ahmed',
    parentPhone: '03009876543',
    admissionDate: '2023-04-01',
  },
  {
    id: '2',
    name: 'Fatima Khan',
    email: 'fatima@example.com',
    phone: '03001234568',
    class: '10-A',
    rollNumber: '002',
    dateOfBirth: '2008-08-22',
    address: 'Lahore, Pakistan',
    parentName: 'Khan Sahib',
    parentPhone: '03009876544',
    admissionDate: '2023-04-01',
  },
  {
    id: '3',
    name: 'Hassan Sheikh',
    email: 'hassan@example.com',
    phone: '03001234569',
    class: '9-B',
    rollNumber: '003',
    dateOfBirth: '2009-03-10',
    address: 'Islamabad, Pakistan',
    parentName: 'Sheikh Sahib',
    parentPhone: '03009876545',
    admissionDate: '2023-04-01',
  },
];

export const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Sarah Ahmad',
    email: 'sarah@school.com',
    phone: '03001111111',
    subject: 'Mathematics',
    qualification: 'PhD Mathematics',
    experience: '10 years',
    salary: 80000,
    joinDate: '2020-01-15',
  },
  {
    id: '2',
    name: 'Prof. Muhammad Iqbal',
    email: 'iqbal@school.com',
    phone: '03002222222',
    subject: 'Physics',
    qualification: 'MSc Physics',
    experience: '8 years',
    salary: 75000,
    joinDate: '2021-03-01',
  },
];

export const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Class 10',
    section: 'A',
    teacherId: '1',
    studentCount: 25,
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Urdu'],
  },
  {
    id: '2',
    name: 'Class 9',
    section: 'B',
    teacherId: '2',
    studentCount: 22,
    subjects: ['Mathematics', 'Physics', 'Biology', 'English', 'Urdu'],
  },
];

export const mockAttendance: Attendance[] = [
  {
    id: '1',
    studentId: '1',
    date: '2024-01-15',
    status: 'present',
  },
  {
    id: '2',
    studentId: '2',
    date: '2024-01-15',
    status: 'present',
  },
  {
    id: '3',
    studentId: '3',
    date: '2024-01-15',
    status: 'absent',
    remarks: 'Sick leave',
  },
];

export const mockGrades: Grade[] = [
  {
    id: '1',
    studentId: '1',
    subject: 'Mathematics',
    marks: 85,
    totalMarks: 100,
    examType: 'Mid Term',
    date: '2024-01-10',
  },
  {
    id: '2',
    studentId: '2',
    subject: 'Physics',
    marks: 78,
    totalMarks: 100,
    examType: 'Mid Term',
    date: '2024-01-10',
  },
];

export const mockFees: Fee[] = [
  {
    id: '1',
    studentId: '1',
    amount: 15000,
    dueDate: '2024-01-31',
    paidDate: '2024-01-20',
    status: 'paid',
    type: 'Monthly Fee',
  },
  {
    id: '2',
    studentId: '2',
    amount: 15000,
    dueDate: '2024-01-31',
    status: 'pending',
    type: 'Monthly Fee',
  },
];