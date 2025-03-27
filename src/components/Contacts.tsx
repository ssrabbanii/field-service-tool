
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock,
  MoreHorizontal,
  User
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';

const Contacts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Sample contacts data
  const contacts = [
    { 
      id: 1, 
      name: 'Acme Corporation', 
      type: 'Business', 
      email: 'contact@acmecorp.com', 
      phone: '(555) 123-4567', 
      address: '123 Business Ave, Industry Park, CA 94107', 
      lastContact: '2 days ago',
      status: 'Customer',
      contacts: [
        { name: 'John Smith', title: 'Facility Manager', phone: '(555) 987-6543', email: 'john@acmecorp.com' },
        { name: 'Jane Doe', title: 'Operations Director', phone: '(555) 234-5678', email: 'jane@acmecorp.com' }
      ],
      notes: 'Regular quarterly maintenance contract. Prefers morning appointments.',
      upcomingAppointments: [
        { date: 'Jun 15, 2023', time: '10:00 AM', type: 'Maintenance' }
      ]
    },
    { 
      id: 2, 
      name: 'Wayne Enterprises', 
      type: 'Business', 
      email: 'info@wayne.com', 
      phone: '(555) 876-5432', 
      address: '1007 Mountain Drive, Gotham, NY 10012', 
      lastContact: 'Yesterday',
      status: 'Customer',
      contacts: [
        { name: 'Bruce Wayne', title: 'CEO', phone: '(555) 111-2222', email: 'bruce@wayne.com' },
        { name: 'Lucius Fox', title: 'Technical Director', phone: '(555) 333-4444', email: 'lucius@wayne.com' }
      ],
      notes: 'Premium client. Requires highest security clearance for all technicians.',
      upcomingAppointments: [
        { date: 'Jun 20, 2023', time: '2:00 PM', type: 'Installation' }
      ]
    },
    { 
      id: 3, 
      name: 'Stark Industries', 
      type: 'Business', 
      email: 'support@stark.com', 
      phone: '(555) 987-1234', 
      address: '200 Park Avenue, New York, NY 10166', 
      lastContact: '1 week ago',
      status: 'Prospect',
      contacts: [
        { name: 'Tony Stark', title: 'Owner', phone: '(555) 555-5555', email: 'tony@stark.com' },
        { name: 'Pepper Potts', title: 'CEO', phone: '(555) 666-7777', email: 'pepper@stark.com' }
      ],
      notes: 'Interested in complete overhaul of building systems. Awaiting proposal approval.',
      upcomingAppointments: [
        { date: 'Jun 25, 2023', time: '1:00 PM', type: 'Consultation' }
      ]
    },
    { 
      id: 4, 
      name: 'Daily Planet', 
      type: 'Business', 
      email: 'info@dailyplanet.com', 
      phone: '(555) 789-0123', 
      address: '1000 Broadway, Metropolis, NY 10036', 
      lastContact: '3 days ago',
      status: 'Customer',
      contacts: [
        { name: 'Perry White', title: 'Editor-in-Chief', phone: '(555) 888-9999', email: 'perry@dailyplanet.com' },
        { name: 'Clark Kent', title: 'Reporter', phone: '(555) 444-3333', email: 'clark@dailyplanet.com' }
      ],
      notes: 'Scheduled for quarterly AC maintenance. Building is open 24/7 - coordinate with security.',
      upcomingAppointments: [
        { date: 'Jul 5, 2023', time: '9:00 AM', type: 'Maintenance' }
      ]
    },
  ];
  
  const filteredContacts = contacts.filter(contact => {
    if (activeTab === 'customers' && contact.status !== 'Customer') return false;
    if (activeTab === 'prospects' && contact.status !== 'Prospect') return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.phone.includes(query) ||
        contact.address.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const [selectedContact, setSelectedContact] = useState<typeof contacts[0] | null>(contacts[0]);
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contacts</h1>
          <p className="text-muted-foreground">Manage your clients and prospects</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Contact
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Contact List</CardTitle>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="customers">Customers</TabsTrigger>
                  <TabsTrigger value="prospects">Prospects</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedContact?.id === contact.id 
                        ? 'bg-muted border-l-4 border-primary' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.type}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        contact.status === 'Customer' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {contact.status}
                      </span>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3 mr-1" />
                      <span className="truncate">{contact.phone}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-muted-foreground">Last contact: {contact.lastContact}</div>
                      <button className="p-1 rounded-full hover:bg-muted transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1 lg:col-span-2 space-y-6">
          {selectedContact && (
            <>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedContact.name}</CardTitle>
                      <p className="text-muted-foreground">{selectedContact.type}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Mail className="h-3.5 w-3.5 mr-1" />
                        Email
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Phone className="h-3.5 w-3.5 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" className="text-xs">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Contact Information</h3>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm">Email</p>
                              <p className="text-sm text-muted-foreground">{selectedContact.email}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm">Phone</p>
                              <p className="text-sm text-muted-foreground">{selectedContact.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm">Address</p>
                              <p className="text-sm text-muted-foreground">{selectedContact.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Notes</h3>
                        <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                          {selectedContact.notes}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Key Contacts</h3>
                        <div className="space-y-3">
                          {selectedContact.contacts.map((person, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{person.name}</p>
                                <p className="text-xs text-muted-foreground">{person.title}</p>
                                <div className="flex space-x-3 mt-1">
                                  <div className="flex items-center text-xs">
                                    <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                                    <span>{person.phone}</span>
                                  </div>
                                  <div className="flex items-center text-xs">
                                    <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                                    <span>{person.email}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Upcoming Appointments</h3>
                        <div className="space-y-2">
                          {selectedContact.upcomingAppointments.map((appointment, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <Calendar className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{appointment.type}</p>
                                <div className="flex space-x-3 mt-1">
                                  <div className="flex items-center text-xs">
                                    <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                                    <span>{appointment.date}</span>
                                  </div>
                                  <div className="flex items-center text-xs">
                                    <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                                    <span>{appointment.time}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Activity History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: 'Service', description: 'Completed quarterly maintenance', date: 'May 15, 2023', technician: 'Mike Johnson' },
                      { type: 'Call', description: 'Discussed upcoming installation project', date: 'May 10, 2023', technician: 'John Doe' },
                      { type: 'Email', description: 'Sent maintenance report and invoice', date: 'May 5, 2023', technician: 'Sarah Williams' },
                      { type: 'Visit', description: 'On-site assessment for new equipment', date: 'April 28, 2023', technician: 'Jane Smith' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start space-x-4 pb-4 border-b border-border last:border-0 last:pb-0">
                        <div className={`p-2 rounded-full ${
                          activity.type === 'Service' ? 'bg-green-100 text-green-600' : 
                          activity.type === 'Call' ? 'bg-blue-100 text-blue-600' : 
                          activity.type === 'Email' ? 'bg-purple-100 text-purple-600' : 
                          'bg-amber-100 text-amber-600'
                        }`}>
                          {activity.type === 'Service' ? (
                            <Calendar className="h-4 w-4" />
                          ) : activity.type === 'Call' ? (
                            <Phone className="h-4 w-4" />
                          ) : activity.type === 'Email' ? (
                            <Mail className="h-4 w-4" />
                          ) : (
                            <MapPin className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">{activity.type}</p>
                            <p className="text-sm text-muted-foreground">{activity.date}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">By: {activity.technician}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
