
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, Clock, MapPin, Users, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('week');
  
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };
  
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Sample events
  const events = [
    { id: 1, title: 'Equipment Maintenance', client: 'Acme Corp', time: '9:00 AM - 11:00 AM', location: '123 Business St', type: 'maintenance', teamSize: 2 },
    { id: 2, title: 'New Installation', client: 'Wayne Enterprises', time: '1:00 PM - 3:30 PM', location: '456 Enterprise Ave', type: 'installation', teamSize: 3 },
    { id: 3, title: 'Client Consultation', client: 'Stark Industries', time: '4:00 PM - 5:00 PM', location: 'Virtual Meeting', type: 'meeting', teamSize: 1 },
  ];
  
  // Get formatted date range for header
  const getFormattedDateRange = () => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    if (view === 'day') {
      return currentDate.toLocaleDateString('en-US', options);
    } else if (view === 'week') {
      const startOfWeek = new Date(currentDate);
      const day = currentDate.getDay();
      const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
      startOfWeek.setDate(diff);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      
      return `${startOfWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">Schedule and manage your field service jobs</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="h-4 w-4" />
          New Event
        </button>
      </div>
      
      <Card>
        <CardHeader className="space-y-2">
          <div className="flex justify-between items-center">
            <CardTitle>{getFormattedDateRange()}</CardTitle>
            <div className="flex items-center space-x-2">
              <button 
                onClick={goToPrevious}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={goToToday}
                className="px-3 py-1 text-sm bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
              >
                Today
              </button>
              <button 
                onClick={goToNext}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <Tabs defaultValue="week" value={view} onValueChange={setView} className="w-full">
            <TabsList className="grid w-full max-w-xs grid-cols-3">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          {view === 'day' && (
            <div className="border rounded-lg">
              <div className="grid grid-cols-1 divide-y">
                {Array.from({ length: 12 }).map((_, index) => {
                  const hour = index + 8; // Start from 8 AM
                  const ampm = hour >= 12 ? 'PM' : 'AM';
                  const hour12 = hour > 12 ? hour - 12 : hour;
                  
                  return (
                    <div key={index} className="flex h-24 group min-h-[6rem]">
                      <div className="w-20 py-2 px-4 text-sm text-muted-foreground border-r">
                        {`${hour12} ${ampm}`}
                      </div>
                      <div className="flex-1 p-2 hover:bg-muted/50 transition-colors cursor-pointer relative">
                        {/* Render events that fall within this hour */}
                        {index === 1 && (
                          <div className="absolute inset-0 m-1 bg-blue-100 border-l-4 border-blue-500 rounded-r-lg p-2 flex flex-col h-20">
                            <div className="font-medium text-sm">Equipment Maintenance</div>
                            <div className="text-xs text-muted-foreground flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" /> 9:00 AM - 11:00 AM
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" /> Acme Corp
                            </div>
                          </div>
                        )}
                        {index === 5 && (
                          <div className="absolute inset-0 m-1 bg-green-100 border-l-4 border-green-500 rounded-r-lg p-2 flex flex-col h-20">
                            <div className="font-medium text-sm">New Installation</div>
                            <div className="text-xs text-muted-foreground flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" /> 1:00 PM - 3:30 PM
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" /> Wayne Enterprises
                            </div>
                          </div>
                        )}
                        {index === 8 && (
                          <div className="absolute inset-0 m-1 bg-purple-100 border-l-4 border-purple-500 rounded-r-lg p-2 flex flex-col h-20">
                            <div className="font-medium text-sm">Client Consultation</div>
                            <div className="text-xs text-muted-foreground flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" /> 4:00 PM - 5:00 PM
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" /> Virtual Meeting
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {view === 'week' && (
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-8 border-b">
                <div className="border-r p-4"></div>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div key={i} className="p-4 text-center border-r last:border-r-0">
                    <div className="font-medium">{day}</div>
                    <div className="text-sm text-muted-foreground">{new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + i + 1).getDate()}</div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-8">
                <div className="border-r">
                  {Array.from({ length: 12 }).map((_, index) => {
                    const hour = index + 8; // Start from 8 AM
                    const ampm = hour >= 12 ? 'PM' : 'AM';
                    const hour12 = hour > 12 ? hour - 12 : hour;
                    
                    return (
                      <div key={index} className="h-24 p-2 text-sm text-muted-foreground border-b last:border-b-0">
                        {`${hour12} ${ampm}`}
                      </div>
                    );
                  })}
                </div>
                
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <div key={dayIndex} className="border-r last:border-r-0">
                    {Array.from({ length: 12 }).map((_, hourIndex) => (
                      <div key={hourIndex} className="h-24 hover:bg-muted/50 transition-colors cursor-pointer p-1 border-b last:border-b-0 relative">
                        {/* Example events - would be dynamically placed in real app */}
                        {dayIndex === 0 && hourIndex === 1 && (
                          <div className="absolute inset-0 m-1 bg-blue-100 border-l-4 border-blue-500 rounded-r-lg p-2 flex flex-col">
                            <div className="font-medium text-xs">Equipment Maintenance</div>
                            <div className="text-xs text-muted-foreground">Acme Corp</div>
                          </div>
                        )}
                        {dayIndex === 2 && hourIndex === 5 && (
                          <div className="absolute inset-0 m-1 bg-green-100 border-l-4 border-green-500 rounded-r-lg p-2 flex flex-col">
                            <div className="font-medium text-xs">New Installation</div>
                            <div className="text-xs text-muted-foreground">Wayne Enterprises</div>
                          </div>
                        )}
                        {dayIndex === 4 && hourIndex === 8 && (
                          <div className="absolute inset-0 m-1 bg-purple-100 border-l-4 border-purple-500 rounded-r-lg p-2 flex flex-col">
                            <div className="font-medium text-xs">Client Meeting</div>
                            <div className="text-xs text-muted-foreground">Stark Industries</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {view === 'month' && (
            <div className="grid grid-cols-7 gap-1 mt-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center text-sm font-medium p-2">
                  {day}
                </div>
              ))}
              
              {Array.from({ length: 35 }).map((_, index) => {
                const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
                const adjustedFirstDay = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;
                const day = index - adjustedFirstDay + 2;
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                const isToday = new Date().toDateString() === date.toDateString();
                
                return (
                  <div 
                    key={index}
                    className={`min-h-[100px] p-1 border rounded-lg ${
                      isCurrentMonth ? 'bg-card' : 'bg-muted/20 text-muted-foreground'
                    } ${isToday ? 'ring-1 ring-primary' : ''}`}
                  >
                    <div className={`text-right p-1 text-sm ${isToday ? 'font-bold' : ''}`}>
                      {date.getDate()}
                    </div>
                    
                    {/* Sample events - would be filtered by date in real app */}
                    {isCurrentMonth && index === 10 && (
                      <div className="bg-blue-100 border-l-4 border-blue-500 rounded-r-lg p-1 mb-1">
                        <div className="text-xs font-medium truncate">Equipment Maintenance</div>
                        <div className="text-xs text-muted-foreground truncate">9:00 AM</div>
                      </div>
                    )}
                    {isCurrentMonth && index === 16 && (
                      <div className="bg-green-100 border-l-4 border-green-500 rounded-r-lg p-1">
                        <div className="text-xs font-medium truncate">New Installation</div>
                        <div className="text-xs text-muted-foreground truncate">1:00 PM</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className={`p-2 rounded-full ${
                    event.type === 'maintenance' ? 'bg-blue-100 text-blue-600' : 
                    event.type === 'installation' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    <CalendarIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.client}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{event.teamSize} team members</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Team Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'John Doe', role: 'Field Technician', status: 'Available', tasks: 2 },
                { name: 'Jane Smith', role: 'Senior Engineer', status: 'On Job', tasks: 1 },
                { name: 'Mike Johnson', role: 'Field Technician', status: 'Available', tasks: 0 },
                { name: 'Sarah Williams', role: 'Customer Representative', status: 'On Break', tasks: 0 },
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground font-medium">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${
                      member.status === 'Available' ? 'text-green-500' : 
                      member.status === 'On Job' ? 'text-blue-500' : 'text-amber-500'
                    }`}>{member.status}</p>
                    <p className="text-xs text-muted-foreground">{member.tasks} tasks today</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
