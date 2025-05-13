
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Student {
  id: string;
  name: string;
  admissionNumber: string;
  rollNumber: string;
  class: string;
  section: string;
  contact: string;
  address: string;
  branch: string;
  dateOfBirth: string;
  mobileNumber: string;
  profileImage?: string;
}

interface Notification {
  id: string;
  type: "message" | "alert";
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
}

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

interface Homework {
  id: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

interface Exam {
  id: string;
  name: string;
  subject: string;
  date: string;
  time: string;
  venue: string;
  marks?: number;
  totalMarks: number;
}

interface Fee {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'partial';
  paidAmount?: number;
}

interface AppContextType {
  student: Student;
  notifications: Notification[];
  attendance: AttendanceRecord[];
  homework: Homework[];
  exams: Exam[];
  fees: Fee[];
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  markNotificationAsRead: (id: string) => void;
  markHomeworkAsCompleted: (id: string) => void;
}

const defaultStudent: Student = {
  id: "1",
  name: "Moola Dhaivik",
  admissionNumber: "2401SIS0001",
  rollNumber: "6",
  class: "NURSERY",
  section: "A",
  contact: "9573843313",
  address: "Mallampet",
  branch: "Bowrampet",
  dateOfBirth: "2021-05-06",
  mobileNumber: "9573843313",
  profileImage: "https://i.pravatar.cc/150?img=11"
};

const defaultNotifications: Notification[] = [
  { 
    id: "1", 
    type: "message", 
    title: "Welcome to School App", 
    description: "Thank you for joining our school app. Stay connected for updates.",
    createdAt: "2023-05-10T08:00:00Z",
    read: false
  },
  { 
    id: "2", 
    type: "alert", 
    title: "Holiday Announcement", 
    description: "School will remain closed on May 15th due to local elections.",
    createdAt: "2023-05-08T10:30:00Z",
    read: false
  }
];

const defaultAttendance: AttendanceRecord[] = [
  { date: '2023-05-01', status: 'present' },
  { date: '2023-05-02', status: 'present' },
  { date: '2023-05-03', status: 'absent', remarks: 'Sick leave' },
  { date: '2023-05-04', status: 'present' },
  { date: '2023-05-05', status: 'late', remarks: 'Traffic delay' },
  { date: '2023-05-08', status: 'present' },
  { date: '2023-05-09', status: 'present' },
  { date: '2023-05-10', status: 'present' }
];

const defaultHomework: Homework[] = [
  {
    id: "1",
    subject: "Mathematics",
    title: "Algebra Exercises",
    description: "Complete exercises 1-10 on page 25 of the textbook.",
    dueDate: "2023-05-15",
    completed: false
  },
  {
    id: "2",
    subject: "Science",
    title: "Plant Study",
    description: "Draw and label the parts of a flowering plant.",
    dueDate: "2023-05-12",
    completed: true
  },
  {
    id: "3",
    subject: "English",
    title: "Essay Writing",
    description: "Write a 500-word essay on your favorite hobby.",
    dueDate: "2023-05-18",
    completed: false
  }
];

const defaultExams: Exam[] = [
  {
    id: "1",
    name: "Mid-Term Examination",
    subject: "Mathematics",
    date: "2023-05-20",
    time: "9:00 AM",
    venue: "Hall A",
    totalMarks: 100
  },
  {
    id: "2",
    name: "Mid-Term Examination",
    subject: "Science",
    date: "2023-05-22",
    time: "9:00 AM",
    venue: "Hall B",
    totalMarks: 100
  }
];

const defaultFees: Fee[] = [
  {
    id: "1",
    name: "Tuition Fee (May)",
    amount: 5000,
    dueDate: "2023-05-10",
    status: 'paid',
    paidAmount: 5000
  },
  {
    id: "2",
    name: "Library Fee",
    amount: 1000,
    dueDate: "2023-05-15",
    status: 'unpaid'
  },
  {
    id: "3",
    name: "Transport Fee (May)",
    amount: 2000,
    dueDate: "2023-05-10",
    status: 'partial',
    paidAmount: 1000
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [student, setStudent] = useState<Student>(defaultStudent);
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(defaultAttendance);
  const [homework, setHomework] = useState<Homework[]>(defaultHomework);
  const [exams, setExams] = useState<Exam[]>(defaultExams);
  const [fees, setFees] = useState<Fee[]>(defaultFees);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (username: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call to validate credentials
    if (username === "parent" && password === "password") {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markHomeworkAsCompleted = (id: string) => {
    setHomework(prevHomework => 
      prevHomework.map(item => 
        item.id === id ? { ...item, completed: true } : item
      )
    );
  };

  return (
    <AppContext.Provider 
      value={{ 
        student,
        notifications, 
        attendance,
        homework,
        exams,
        fees,
        isLoggedIn,
        login,
        logout,
        markNotificationAsRead,
        markHomeworkAsCompleted
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
