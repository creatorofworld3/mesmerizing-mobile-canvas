
import { ReactNode } from "react";
import Header from "./Header";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showNavigation?: boolean;
  showBackButton?: boolean;
}

const Layout = ({ 
  children, 
  title = "Moola Dhaivik",
  showNavigation = true,
  showBackButton = false
}: LayoutProps) => {
  return (
    <div className="mobile-container">
      <Header title={title} showBackButton={showBackButton} />
      <main className="pb-20">
        {children}
      </main>
      {showNavigation && <Navigation />}
    </div>
  );
};

export default Layout;
