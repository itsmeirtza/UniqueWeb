export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  rollNumber: string;
  dateOfBirth: string;
  address: string;
  parentName: string;
  parentPhone: string;
  admissionDate: string;
  photo?: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  qualification: string;
  experience: string;
  salary: number;
  joinDate: string;
  photo?: string;
}

export interface Class {
  id: string;
  name: string;
  section: string;
  teacherId: string;
  studentCount: number;
  subjects: string[];
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subject: string;
  marks: number;
  totalMarks: number;
  examType: string;
  date: string;
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  type: string;
}