import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CheckPolicy from "./pages/CheckPolicy";
import Conflicts from "./pages/Conflicts";
import PolicyDatabase from "./pages/PolicyDatabase";
import ChatAssistant from "./pages/ChatAssistant";
import Admin from "./pages/Admin";
import Readability from "./pages/Readability";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/check-policy" element={<CheckPolicy />} />
          <Route path="/conflicts" element={<Conflicts />} />
          <Route path="/policy-database" element={<PolicyDatabase />} />
          <Route path="/chat-assistant" element={<ChatAssistant />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/readability" element={<Readability />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
