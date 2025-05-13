
import { useAppContext } from "@/context/AppContext";

const StudentCard = () => {
  const { student } = useAppContext();
  
  return (
    <div className="student-card p-4 mb-4">
      <div className="flex items-center">
        <div className="h-16 w-16 bg-school-secondary rounded-full overflow-hidden mr-4 flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="30" fill="#FFBB33"/>
            <path d="M30 15C24.477 15 20 19.477 20 25V26.5C20 32.023 24.477 36.5 30 36.5C35.523 36.5 40 32.023 40 26.5V25C40 19.477 35.523 15 30 15Z" fill="#333333"/>
            <path d="M30 20C27.5 20 26 22.5 26 25H34C34 22.5 32.5 20 30 20Z" fill="#FFFFFF"/>
            <path d="M35 30.5H25C25 33.5 27.239 36 30 36C32.761 36 35 33.5 35 30.5Z" fill="#FFFFFF"/>
            <path d="M25 42V40C25 38.895 25.895 38 27 38H33C34.105 38 35 38.895 35 40V42L37 44H23L25 42Z" fill="#333333"/>
            <path d="M30 10L34 13H26L30 10Z" fill="#333333"/>
            <path d="M30 6V10" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        
        <div className="text-left">
          <h2 className="text-xl font-bold">{student.name}</h2>
          <p className="text-sm opacity-80">Class: {student.class} | Section: {student.section}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
