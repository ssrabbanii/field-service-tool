
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import Contacts from "./components/Contacts";
import Communications from "./components/Communications";
import Map from "./components/Map";
import Integrations from "./components/Integrations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/calendar" element={
            <Layout>
              <Calendar />
            </Layout>
          } />
          <Route path="/contacts" element={
            <Layout>
              <Contacts />
            </Layout>
          } />
          <Route path="/communications" element={
            <Layout>
              <Communications />
            </Layout>
          } />
          <Route path="/map" element={
            <Layout>
              <Map />
            </Layout>
          } />
          <Route path="/integrations" element={
            <Layout>
              <Integrations />
            </Layout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
