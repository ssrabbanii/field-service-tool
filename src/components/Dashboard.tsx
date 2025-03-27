
import React from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  BarChart3,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John Doe</p>
        </div>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="interactive-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">12 jobs scheduled for this week</p>
            <div className="mt-4 flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>12% from last week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="interactive-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Efficiency</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92%</div>
            <Progress value={92} className="h-1.5 mt-2" />
            <div className="mt-4 flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>3% from last week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="interactive-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">187</div>
            <p className="text-xs text-muted-foreground">24 new clients this month</p>
            <div className="mt-4 flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>8% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="interactive-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">98%</div>
            <Progress value={98} className="h-1.5 mt-2" />
            <div className="mt-4 flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>2% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity and Tasks */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { client: 'Acme Corp', type: 'Maintenance', status: 'Completed', date: '2 hours ago' },
                { client: 'Wayne Enterprises', type: 'Installation', status: 'In Progress', date: '4 hours ago' },
                { client: 'Stark Industries', type: 'Repair', status: 'Delayed', date: 'Yesterday' },
                { client: 'Daily Planet', type: 'Inspection', status: 'Completed', date: 'Yesterday' },
              ].map((job, index) => (
                <div key={index} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="flex items-start space-x-4">
                    <div className={`w-2 h-2 mt-2 rounded-full ${
                      job.status === 'Completed' ? 'bg-green-500' : 
                      job.status === 'In Progress' ? 'bg-blue-500' : 'bg-amber-500'
                    }`} />
                    <div>
                      <p className="font-medium">{job.client}</p>
                      <p className="text-sm text-muted-foreground">{job.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${
                      job.status === 'Completed' ? 'text-green-500' : 
                      job.status === 'In Progress' ? 'text-blue-500' : 'text-amber-500'
                    }`}>{job.status}</p>
                    <p className="text-xs text-muted-foreground">{job.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Equipment maintenance at Acme Corp', priority: 'High', time: '10:00 AM' },
                { title: 'Client meeting with Wayne Enterprises', priority: 'Medium', time: '1:30 PM' },
                { title: 'Inspection at Stark Tower', priority: 'Low', time: '3:00 PM' },
                { title: 'Team debrief', priority: 'Medium', time: '5:00 PM' },
              ].map((task, index) => (
                <div key={index} className="flex items-start space-x-4 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className={`p-2 rounded-full ${
                    task.priority === 'High' ? 'bg-red-100 text-red-600' : 
                    task.priority === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                  }`}>
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{task.title}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">Today at {task.time}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        task.priority === 'High' ? 'bg-red-100 text-red-600' : 
                        task.priority === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-end justify-between px-2">
            {[65, 40, 75, 50, 90, 80].map((value, i) => (
              <div key={i} className="relative w-1/12">
                <div 
                  className="w-full bg-primary/20 rounded-t-sm" 
                  style={{ height: `${value}%` }}
                >
                  <div 
                    className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-500" 
                    style={{ height: `${value}%` }}
                  />
                </div>
                <div className="text-xs text-center mt-2 text-muted-foreground">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
