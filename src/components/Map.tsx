
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  MapPin, 
  Users, 
  Calendar, 
  Clock, 
  ChevronsUpDown, 
  Filter,
  Layers
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const Map: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Field Map</h1>
          <p className="text-muted-foreground">View and manage field operations</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Layers
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Search Locations</CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search address or client..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Current Jobs</h3>
                <div className="space-y-2">
                  {[
                    { id: 1, client: 'Acme Corp', address: '123 Business St, San Francisco, CA', type: 'Maintenance', time: 'In Progress' },
                    { id: 2, client: 'Wayne Enterprises', address: '456 Enterprise Ave, Oakland, CA', type: 'Installation', time: '2:00 PM' },
                    { id: 3, client: 'Stark Industries', address: '789 Innovation Dr, San Jose, CA', type: 'Repair', time: '4:00 PM' },
                  ].map((job) => (
                    <div key={job.id} className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{job.client}</h4>
                        <div className={`text-xs px-2 py-0.5 rounded-full ${
                          job.time === 'In Progress' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {job.time}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{job.address}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-xs">{job.type}</div>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
                
              <div className="space-y-4 mt-6">
                <h3 className="text-sm font-medium">Team Locations</h3>
                <div className="space-y-2">
                  {[
                    { id: 1, name: 'John Doe', role: 'Field Technician', location: 'Acme Corp', distance: '0.5 mi' },
                    { id: 2, name: 'Jane Smith', role: 'Senior Engineer', location: 'En route to Wayne Enterprises', distance: '3.2 mi' },
                    { id: 3, name: 'Mike Johnson', role: 'Field Technician', location: 'Office', distance: '0 mi' },
                  ].map((member) => (
                    <div key={member.id} className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs text-primary font-medium">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{member.name}</h4>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-xs text-muted-foreground">{member.location}</div>
                        <div className="text-xs">{member.distance}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1 lg:col-span-3">
          <Card className="h-[700px] overflow-hidden">
            <CardContent className="p-0 h-full relative">
              {/* Map Placeholder - In a real application, you'd integrate with Google Maps, Mapbox, etc. */}
              <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="h-8 w-8 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">Interactive Map</p>
                  <p className="text-xs text-muted-foreground">Integrate with your preferred mapping service</p>
                </div>
              </div>
              
              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <Button variant="outline" size="icon" className="h-8 w-8 bg-background/90 backdrop-blur-sm">
                  <ChevronsUpDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 bg-background/90 backdrop-blur-sm">
                  <Layers className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Job Detail Card - This would appear when a job marker is clicked */}
              <div className="absolute bottom-4 left-4 w-72 bg-background/90 backdrop-blur-sm border rounded-lg p-4 shadow-lg animate-fade-in">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">Acme Corp</h3>
                  <div className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600">In Progress</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">123 Business St, San Francisco, CA</p>
                
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="text-xs">
                    <span className="text-muted-foreground">Job Type:</span>
                    <p>Maintenance</p>
                  </div>
                  <div className="text-xs">
                    <span className="text-muted-foreground">Started:</span>
                    <p>9:30 AM</p>
                  </div>
                  <div className="text-xs">
                    <span className="text-muted-foreground">Team:</span>
                    <p>John Doe, 1 other</p>
                  </div>
                  <div className="text-xs">
                    <span className="text-muted-foreground">ETA:</span>
                    <p>11:30 AM</p>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    Schedule
                  </Button>
                  <Button size="sm" className="w-full">
                    <Users className="h-3.5 w-3.5 mr-1" />
                    Team
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { 
                id: 1, 
                client: 'Wayne Enterprises', 
                address: '456 Enterprise Ave, Oakland, CA', 
                type: 'Installation', 
                time: '2:00 PM',
                team: ['Jane Smith', 'Mike Johnson'],
                duration: '2 hours'
              },
              { 
                id: 2, 
                client: 'Stark Industries', 
                address: '789 Innovation Dr, San Jose, CA', 
                type: 'Repair', 
                time: '4:00 PM',
                team: ['John Doe'],
                duration: '1.5 hours'
              },
              { 
                id: 3, 
                client: 'Daily Planet', 
                address: '101 Media St, Berkeley, CA', 
                type: 'Maintenance', 
                time: 'Tomorrow, 9:00 AM',
                team: ['Sarah Williams', 'Robert Brown'],
                duration: '3 hours'
              },
            ].map((job) => (
              <div key={job.id} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{job.client}</h3>
                  <div className={`text-xs px-2 py-0.5 rounded-full ${
                    job.type === 'Installation' ? 'bg-green-100 text-green-600' : 
                    job.type === 'Repair' ? 'bg-amber-100 text-amber-600' : 
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {job.type}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{job.address}</p>
                
                <div className="flex space-x-4 mt-3">
                  <div className="flex items-center text-xs">
                    <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span>{job.time}</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span>{job.duration}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground">Team:</p>
                  <div className="flex mt-1">
                    {job.team.map((member, index) => (
                      <div 
                        key={index} 
                        className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center -ml-1 first:ml-0 border border-background"
                      >
                        <span className="text-xs text-primary">
                          {member.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <MapPin className="h-3 w-3 mr-1" />
                    Directions
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    Reschedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Map;
