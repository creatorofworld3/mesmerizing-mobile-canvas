
import { createContext, useContext, useState, ReactNode } from "react";

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
  admissionType: string;
  admissionDate: string;
  dateOfBirth: string;
  category: string;
  mobileNumber: string;
}

interface Notification {
  id: string;
  type: "message" | "alert";
  count: number;
}

interface AppContextType {
  student: Student;
  notifications: Notification[];
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
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
  admissionType: "",
  admissionDate: "",
  dateOfBirth: "2021-05-06",
  category: "",
  mobileNumber: "9573843313"
};

const defaultNotifications: Notification[] = [
  { id: "1", type: "message", count: 1 },
  { id: "2", type: "alert", count: 1 }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [student, setStudent] = useState<Student>(defaultStudent);
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);
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

  return (
    <AppContext.Provider 
      value={{ 
        student, 
        notifications, 
        isLoggedIn,
        login,
        logout
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
