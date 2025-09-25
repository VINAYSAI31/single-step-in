import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import PGOwnerLogin from "./pages/PGOwnerLogin";
import PGOwnerDashboard from "./pages/PGOwnerDashboard";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/next"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider> 
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/pg-owner" element={<PGOwnerLogin />} />
          <Route path="/pg-owner/dashboard" element={<PGOwnerDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </BrowserRouter>
            <Analytics />

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
