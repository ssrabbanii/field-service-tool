
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Zap, 
  Puzzle, 
  Link, 
  ExternalLink, 
  Settings, 
  Check, 
  X, 
  Plus,
  Webhook,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Integrations: React.FC = () => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = (platform: string) => {
    toast({
      title: "Connection Initiated",
      description: `Connecting to ${platform}...`,
    });
    
    // Simulate connection process
    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${platform}!`,
      });
    }, 1500);
  };
  
  const handleTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real app, this would actually send data to the webhook
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Webhook Triggered",
        description: "Your webhook was triggered successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to trigger webhook",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-muted-foreground">Connect your field service tools with external services</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Custom Integration
        </Button>
      </div>
      
      <Tabs defaultValue="automation" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="automation" className="flex items-center justify-center gap-2">
            <Zap className="h-4 w-4" />
            Automation
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center justify-center gap-2">
            <Webhook className="h-4 w-4" />
            API & Webhooks
          </TabsTrigger>
          <TabsTrigger value="apps" className="flex items-center justify-center gap-2">
            <Puzzle className="h-4 w-4" />
            Apps
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="automation" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                name: 'Zapier', 
                logo: 'Z', 
                color: 'bg-orange-500', 
                description: 'Connect with 3,000+ apps and automate your workflow',
                connected: true
              },
              { 
                name: 'Make', 
                logo: 'M', 
                color: 'bg-blue-600', 
                description: 'Create complex automation scenarios with a visual builder',
                connected: false
              },
              { 
                name: 'Gumloop', 
                logo: 'G', 
                color: 'bg-purple-600', 
                description: 'Automate messaging and workflows with AI assistance',
                connected: false
              },
              { 
                name: 'Microsoft Power Automate', 
                logo: 'P', 
                color: 'bg-indigo-500', 
                description: 'Create automated workflows between your apps and services',
                connected: false
              },
              { 
                name: 'Integromat', 
                logo: 'I', 
                color: 'bg-green-500', 
                description: 'Connect apps and automate workflows in a few clicks',
                connected: false
              },
              { 
                name: 'Tray.io', 
                logo: 'T', 
                color: 'bg-cyan-500', 
                description: 'Powerful workflow automation without coding',
                connected: false
              },
            ].map((integration) => (
              <Card key={integration.name} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${integration.color} text-white flex items-center justify-center font-bold`}>
                        {integration.logo}
                      </div>
                      <CardTitle>{integration.name}</CardTitle>
                    </div>
                    {integration.connected ? (
                      <div className="flex items-center text-xs text-green-600 font-medium">
                        <Check className="h-3.5 w-3.5 mr-1" />
                        Connected
                      </div>
                    ) : null}
                  </div>
                  <CardDescription className="pt-1.5">{integration.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-1 pb-4">
                  {integration.connected ? (
                    <div className="flex space-x-2 w-full">
                      <Button variant="outline" size="sm" className="w-full">
                        <Settings className="h-3.5 w-3.5 mr-1.5" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm" className="w-full text-destructive hover:text-destructive">
                        <X className="h-3.5 w-3.5 mr-1.5" />
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" className="w-full" onClick={() => handleConnect(integration.name)}>
                      <Link className="h-3.5 w-3.5 mr-1.5" />
                      Connect
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Automation Templates</CardTitle>
              <CardDescription>Ready-to-use automation templates for common field service workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { 
                    title: 'Appointment Reminder', 
                    description: 'Send SMS reminders 24 hours before appointments', 
                    platform: 'Zapier',
                    tags: ['SMS', 'Calendar'],
                    popular: true
                  },
                  { 
                    title: 'Job Completion Report', 
                    description: 'Email detailed reports when jobs are marked complete', 
                    platform: 'Make',
                    tags: ['Email', 'Reports'],
                    popular: false
                  },
                  { 
                    title: 'New Lead Processing', 
                    description: 'Automatically create contacts from web form submissions', 
                    platform: 'Zapier',
                    tags: ['CRM', 'Forms'],
                    popular: true
                  },
                ].map((template, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{template.title}</h3>
                      {template.popular && (
                        <div className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                          Popular
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex space-x-2">
                        {template.tags.map((tag, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-muted">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">{template.platform}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your API keys to connect external services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex space-x-2">
                      <Input id="api-key" type="password" value="sk_live_12345678901234567890" readOnly />
                      <Button variant="outline">Copy</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api-secret">API Secret</Label>
                    <div className="flex space-x-2">
                      <Input id="api-secret" type="password" value="sk_secret_12345678901234567890" readOnly />
                      <Button variant="outline">Copy</Button>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline">Generate New Keys</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Webhook Testing</CardTitle>
                <CardDescription>Quickly test your webhook endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTrigger}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="webhook-url">Webhook URL</Label>
                      <Input 
                        id="webhook-url" 
                        placeholder="https://your-webhook-url.com" 
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Event Type</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {['job.created', 'job.updated', 'job.completed', 'contact.created'].map((event) => (
                          <div key={event} className="flex items-center space-x-2 border rounded-md p-2">
                            <Switch id={event} />
                            <Label htmlFor={event} className="text-sm">{event}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Triggering..." : "Trigger Webhook"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>Resources to help you integrate with our platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { 
                      title: 'Getting Started', 
                      description: 'Learn the basics of our API and authentication', 
                      icon: Zap
                    },
                    { 
                      title: 'API Reference', 
                      description: 'Detailed documentation for all API endpoints', 
                      icon: Webhook
                    },
                    { 
                      title: 'Webhook Events', 
                      description: 'Learn about webhook events and payloads', 
                      icon: MessageSquare
                    },
                  ].map((doc, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex flex-col items-center text-center">
                        <div className="p-3 rounded-full bg-primary/10 mb-3">
                          <doc.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                        <Button variant="ghost" size="sm" className="mt-4">
                          <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                          View Documentation
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="apps" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                name: 'QuickBooks', 
                logo: 'QB', 
                color: 'bg-green-600', 
                description: 'Sync invoices, payments, and customer data',
                connected: true,
                category: 'Accounting'
              },
              { 
                name: 'Stripe', 
                logo: 'S', 
                color: 'bg-purple-600', 
                description: 'Process payments and manage subscriptions',
                connected: false,
                category: 'Payments'
              },
              { 
                name: 'Mailchimp', 
                logo: 'MC', 
                color: 'bg-yellow-600', 
                description: 'Email marketing campaigns and automation',
                connected: false,
                category: 'Marketing'
              },
              { 
                name: 'Google Calendar', 
                logo: 'GC', 
                color: 'bg-blue-600', 
                description: 'Sync appointments and schedule events',
                connected: true,
                category: 'Calendar'
              },
              { 
                name: 'Twilio', 
                logo: 'TW', 
                color: 'bg-red-600', 
                description: 'Send SMS and voice notifications to clients',
                connected: false,
                category: 'Communication'
              },
              { 
                name: 'Salesforce', 
                logo: 'SF', 
                color: 'bg-blue-500', 
                description: 'Sync contacts, opportunities, and activities',
                connected: false,
                category: 'CRM'
              },
            ].map((app) => (
              <Card key={app.name}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${app.color} text-white flex items-center justify-center font-bold text-sm`}>
                        {app.logo}
                      </div>
                      <div>
                        <CardTitle>{app.name}</CardTitle>
                        <CardDescription className="text-xs mt-0.5">{app.category}</CardDescription>
                      </div>
                    </div>
                    {app.connected ? (
                      <div className="flex items-center text-xs text-green-600 font-medium">
                        <Check className="h-3.5 w-3.5 mr-1" />
                        Connected
                      </div>
                    ) : null}
                  </div>
                  <CardDescription className="pt-1">{app.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-1 pb-4">
                  {app.connected ? (
                    <div className="flex space-x-2 w-full">
                      <Button variant="outline" size="sm" className="w-full">
                        <Settings className="h-3.5 w-3.5 mr-1.5" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm" className="w-full text-destructive hover:text-destructive">
                        <X className="h-3.5 w-3.5 mr-1.5" />
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" className="w-full" onClick={() => handleConnect(app.name)}>
                      <Link className="h-3.5 w-3.5 mr-1.5" />
                      Connect
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>App Marketplace</CardTitle>
              <CardDescription>Discover more apps to extend your field service platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { category: 'Accounting & Finance', count: 24 },
                  { category: 'CRM & Customer Support', count: 32 },
                  { category: 'Communication & Marketing', count: 28 },
                  { category: 'Scheduling & Dispatch', count: 16 },
                  { category: 'Inventory & Asset Management', count: 19 },
                  { category: 'Analytics & Reporting', count: 22 },
                ].map((category, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <h3 className="font-medium">{category.category}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-muted-foreground">{category.count} apps</p>
                      <Button variant="ghost" size="sm" className="h-8">
                        Browse
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Visit App Marketplace
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Integrations;
