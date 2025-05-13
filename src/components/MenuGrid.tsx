
import { useNavigate } from "react-router-dom";

interface MenuItem {
  title: string;
  icon: string;
  path: string;
}

interface MenuGridProps {
  items: MenuItem[];
}

const MenuGrid = ({ items }: MenuGridProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="menu-grid">
      {items.map((item, index) => (
        <div 
          key={index}
          className="menu-item hover:shadow-md transition-shadow duration-200"
          onClick={() => navigate(item.path)}
        >
          <div className="menu-item-icon" dangerouslySetInnerHTML={{ __html: item.icon }} />
          <span className="text-sm font-medium text-gray-800">{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default MenuGrid;
