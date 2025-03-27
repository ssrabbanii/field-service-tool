
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MessageSquare, 
  Map, 
  Settings, 
  LogOut, 
  Bell,
  Zap
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [notifications, setNotifications] = useState(3);
  
  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };
  
  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Calendar', icon: Calendar, path: '/calendar' },
    { name: 'Contacts', icon: Users, path: '/contacts' },
    { name: 'Communications', icon: MessageSquare, path: '/communications' },
    { name: 'Field Map', icon: Map, path: '/map' },
    { name: 'Integrations', icon: Zap, path: '/integrations' },
  ];
  
  return (
    <div className="w-72 h-full border-r border-border bg-background flex flex-col">
      {/* Logo */}
      <div className="flex items-center p-6 h-16 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">FS</span>
          </div>
          <span className="font-semibold text-xl">FieldService</span>
        </div>
      </div>
      
      {/* User Profile */}
      <div className="border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground font-medium">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">Field Manager</p>
          </div>
          <div className="relative">
            <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full animate-pulse-subtle" />
            )}
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`nav-item ${isActiveRoute(item.path) ? 'nav-item-active' : ''}`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      
      {/* Bottom Navigation */}
      <div className="p-4 border-t border-border">
        <Link to="/settings" className="nav-item">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
        <button className="nav-item mt-2 w-full justify-start">
          <LogOut className="h-5 w-5" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
