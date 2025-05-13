
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import Layout from "@/components/Layout";
import StudentCard from "@/components/StudentCard";
import MenuGrid from "@/components/MenuGrid";
import { menuItems } from "@/data/menuItems";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  
  if (!isLoggedIn) {
    return null;
  }
  
  return (
    <Layout>
      <div className="p-4">
        <StudentCard />
        <MenuGrid items={menuItems} />
      </div>
    </Layout>
  );
};

export default Dashboard;
