
import { useNavigate, useLocation } from "react-router-dom";
import { Home } from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <nav className="nav-tabs">
      <button 
        onClick={() => navigate("/dashboard")}
        className="flex flex-col items-center justify-center"
      >
        <Home className="h-6 w-6 text-white" />
      </button>
    </nav>
  );
};

export default Navigation;
