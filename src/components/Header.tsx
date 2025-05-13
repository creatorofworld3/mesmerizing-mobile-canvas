
import { useNavigate } from "react-router-dom";
import { Bell, MessageSquare } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header = ({ title, showBackButton = false }: HeaderProps) => {
  const navigate = useNavigate();
  const { notifications } = useAppContext();
  
  const messageNotification = notifications.find(n => n.type === "message");
  const alertNotification = notifications.find(n => n.type === "alert");

  return (
    <header className="app-header flex items-center justify-between">
      <div className="flex items-center">
        {showBackButton && (
          <button 
            onClick={() => navigate(-1)} 
            className="mr-2 p-1 rounded-full"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <MessageSquare className="h-6 w-6" />
          {messageNotification && messageNotification.count > 0 && (
            <span className="absolute -top-1 -right-1 bg-school-secondary text-xs text-black rounded-full h-4 w-4 flex items-center justify-center">
              {messageNotification.count}
            </span>
          )}
        </div>
        
        <div className="relative">
          <Bell className="h-6 w-6" />
          {alertNotification && alertNotification.count > 0 && (
            <span className="absolute -top-1 -right-1 bg-school-accent text-xs text-white rounded-full h-4 w-4 flex items-center justify-center">
              {alertNotification.count}
            </span>
          )}
        </div>

        <div className="h-8 w-8 rounded-full bg-school-secondary flex items-center justify-center overflow-hidden">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16C13.6569 16 15 14.6569 15 13H9C9 14.6569 10.3431 16 12 16Z" fill="#333"/>
            <path d="M12 4C8 4 7 8 7 10V13H17V10C17 8 16 4 12 4Z" fill="#333"/>
            <path d="M19 13V10C19 6.88889 17.5556 2 12 2C6.44444 2 5 6.88889 5 10V13L3 15V16H21V15L19 13Z" stroke="#333" strokeWidth="1.5"/>
            <path d="M12.0498 20C13.7122 20 15.0603 18.6569 15.0603 17H9.0393C9.0393 18.6569 10.3874 20 12.0498 20Z" fill="#333"/>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
