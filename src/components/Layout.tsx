
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="fixed z-50 bottom-4 right-4 md:hidden bg-primary text-primary-foreground p-3 rounded-full shadow-lg" 
        onClick={toggleSidebar}
      >
        {sidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>
      
      {/* Sidebar */}
      <div 
        className={`fixed md:relative z-40 h-full md:h-screen transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'left-0' : '-left-72 md:left-0'
        }`}
      >
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 relative h-screen overflow-auto">
        <div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl animate-fade-in">
          {children}
        </div>
      </main>
      
      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden" 
          onClick={toggleSidebar} 
        />
      )}
    </div>
  );
};

export default Layout;
