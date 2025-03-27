
import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Search, 
  Plus, 
  Send, 
  Paperclip, 
  Image, 
  Smile, 
  Phone, 
  Video,
  MoreHorizontal,
  Calendar,
  User
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Communications: React.FC = () => {
  const [messageText, setMessageText] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  
  // Sample contacts
  const contacts = [
    { id: 1, name: 'John Smith', company: 'Acme Corp', lastMessage: 'I need to reschedule our appointment...', time: '10:30 AM', unread: 2 },
    { id: 2, name: 'Jane Doe', company: 'Wayne Enterprises', lastMessage: 'The installation was completed successfully.', time: 'Yesterday', unread: 0 },
    { id: 3, name: 'Mike Johnson', company: 'Stark Industries', lastMessage: 'Can you send me the quote for the new equipment?', time: 'Yesterday', unread: 0 },
    { id: 4, name: 'Sarah Williams', company: 'Daily Planet', lastMessage: 'We need to schedule the quarterly maintenance.', time: 'Jun 10', unread: 0 },
    { id: 5, name: 'Robert Brown', company: 'LexCorp', lastMessage: 'When can your team come for an inspection?', time: 'Jun 8', unread: 0 },
  ];
  
  // Sample emails
  const emails = [
    { 
      id: 1, 
      from: 'John Smith', 
      email: 'john.smith@acmecorp.com', 
      subject: 'Rescheduling Appointment', 
      preview: 'I need to reschedule our maintenance appointment scheduled for tomorrow...', 
      time: '10:30 AM',
      read: false
    },
    { 
      id: 2, 
      from: 'Jane Doe', 
      email: 'jane.doe@wayne.com', 
      subject: 'Installation Confirmation', 
      preview: 'This email confirms that the installation at our facility was completed successfully...', 
      time: 'Yesterday',
      read: true
    },
    { 
      id: 3, 
      from: 'Mike Johnson', 
      email: 'mike.j@stark.com', 
      subject: 'Quote Request for New Equipment', 
      preview: "We're looking to upgrade our systems and would like to get a quote for new equipment...", 
      time: 'Yesterday',
      read: true
    },
    { 
      id: 4, 
      from: 'Sarah Williams', 
      email: 's.williams@dailyplanet.com', 
      subject: 'Quarterly Maintenance Schedule', 
      preview: "It's time for our quarterly maintenance check. Can we schedule it for next week?", 
      time: 'Jun 10',
      read: true
    },
    { 
      id: 5, 
      from: 'Robert Brown', 
      email: 'r.brown@lexcorp.com', 
      subject: 'Facility Inspection Request', 
      preview: "We're interested in having your team conduct an inspection of our facilities...", 
      time: 'Jun 8',
      read: true
    },
  ];
  
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [selectedEmail, setSelectedEmail] = useState(emails[0]);
  
  // Sample messages
  const messages = [
    { id: 1, sender: 'John Smith', time: '10:25 AM', text: 'Hello, I need to reschedule our appointment for tomorrow. Something urgent came up.', isUser: false },
    { id: 2, sender: 'You', time: '10:27 AM', text: 'No problem, John. When would you like to reschedule?', isUser: true },
    { id: 3, sender: 'John Smith', time: '10:30 AM', text: 'Would Friday at 2 PM work for you? Or perhaps early next week?', isUser: false },
  ];
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    // In a real app, this would send the message to the backend
    console.log('Sending message:', messageText);
    setMessageText('');
  };
  
  const handleSendEmail = () => {
    if (!emailSubject.trim() || !emailBody.trim()) return;
    // In a real app, this would send the email to the backend
    console.log('Sending email:', { subject: emailSubject, body: emailBody });
    setEmailSubject('');
    setEmailBody('');
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Communications</h1>
          <p className="text-muted-foreground">Manage all your client communications in one place</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Call
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Message
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-2">
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <Card className="col-span-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Conversations</CardTitle>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search messages..." className="pl-8" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        selectedContact.id === contact.id 
                          ? 'bg-muted border-l-4 border-primary' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground font-medium">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{contact.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{contact.company}</p>
                          </div>
                          <div className="text-xs text-muted-foreground">{contact.time}</div>
                        </div>
                        <p className="text-sm truncate mt-1">{contact.lastMessage}</p>
                      </div>
                      {contact.unread > 0 && (
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-xs text-primary-foreground">{contact.unread}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground font-medium">
                        {selectedContact.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle>{selectedContact.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{selectedContact.company}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col h-[500px]">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="flex items-start max-w-[80%] space-x-2">
                          {!message.isUser && (
                            <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0 flex items-center justify-center">
                              <span className="text-xs text-muted-foreground font-medium">
                                {message.sender.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          )}
                          <div>
                            <div className={`p-3 rounded-lg ${
                              message.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            }`}>
                              <p className="text-sm">{message.text}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{message.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t">
                    <div className="flex space-x-2">
                      <Textarea 
                        placeholder="Type your message..." 
                        className="min-h-[80px]"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Image className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Smile className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="email">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <Card className="col-span-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Inbox</CardTitle>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search emails..." className="pl-8" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {emails.map((email) => (
                    <div
                      key={email.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedEmail.id === email.id 
                          ? 'bg-muted border-l-4 border-primary' 
                          : 'hover:bg-muted/50'
                      } ${!email.read ? 'font-medium' : ''}`}
                      onClick={() => setSelectedEmail(email)}
                    >
                      <div className="flex justify-between items-start">
                        <p className={!email.read ? 'font-medium' : ''}>{email.from}</p>
                        <p className="text-xs text-muted-foreground">{email.time}</p>
                      </div>
                      <p className="text-sm font-medium truncate mt-1">{email.subject}</p>
                      <p className="text-sm text-muted-foreground truncate mt-1">{email.preview}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader className="pb-3 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedEmail.subject}</CardTitle>
                    <div className="flex items-center mt-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{selectedEmail.from}</p>
                        <p className="text-xs text-muted-foreground">{selectedEmail.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Mail className="h-3.5 w-3.5 mr-1" />
                      Reply
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 space-y-4">
                  <p className="text-sm">{selectedEmail.preview}</p>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.
                  </p>
                  <p className="text-sm">
                    Nam feugiat, nunc non ultrices tincidunt, quam purus congue ipsum, aliquam cursus velit turpis non felis. Vivamus id gravida felis, non scelerisque sem.
                  </p>
                  <p className="text-sm">Best regards,</p>
                  <p className="text-sm font-medium">{selectedEmail.from}</p>
                </div>
                
                <div className="mt-6 border-t pt-6">
                  <h3 className="font-medium mb-4">Reply</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Subject</label>
                      <Input
                        placeholder="RE: Subject"
                        value={`RE: ${selectedEmail.subject}`}
                        onChange={(e) => setEmailSubject(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Message</label>
                      <Textarea 
                        placeholder="Type your reply..." 
                        className="min-h-[150px]"
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Image className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button onClick={handleSendEmail}>
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Communications;
