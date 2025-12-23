import { useState } from "react";
import { Plus, Send, FileText, AlertTriangle, Search, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { cn } from "@/lib/utils";

// Recent chats data
const recentChats = [
  {
    id: 1,
    title: "New Chat",
    date: "11/19/2025",
    isActive: true,
  },
  {
    id: 2,
    title: "How many rules are there in APRA",
    date: "11/18/2025",
    isActive: false,
  },
  {
    id: 3,
    title: "What is the change made to inside...",
    date: "11/5/2025",
    isActive: false,
  },
  {
    id: 4,
    title: "What is the change made to inside...",
    date: "11/4/2025",
    isActive: false,
  },
];

// Suggestion cards data
const suggestionCards = [
  {
    id: 1,
    icon: FileText,
    title: "Insider Trade Changes (Oct 2023)",
    description: "What is the change made to insider trade policy in October 2023?",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    id: 2,
    icon: AlertTriangle,
    title: "Recent Policy Updates (2025)",
    description: "What is the change made to insider trade policy in October 2025?",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    id: 3,
    icon: Search,
    title: "Policy Knowledgebase",
    description: "How many policies are there in your knowledgebase?",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: 4,
    icon: MessageCircle,
    title: "Insider Trading Key Considerations",
    description: "What is the most important thing that I need to consider for insider trading policy?",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
];

export default function ChatAssistant() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(1);

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleSuggestionClick = (suggestion: typeof suggestionCards[0]) => {
    setMessage(suggestion.description);
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar collapsed={sidebarCollapsed} currentPath="/chat-assistant" />

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 lg:p-8 pb-0">
          <DashboardHeader onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} title="Policy Dashboard" />
        </div>

        <div className="flex-1 flex overflow-hidden px-6 lg:px-8 pb-6">
          {/* Recents Panel */}
          <div className="w-64 border-r border-border pr-4 mr-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">Recents</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-1 flex-1 overflow-auto">
              {recentChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg transition-colors",
                    selectedChat === chat.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  <p className={cn(
                    "text-sm font-medium truncate",
                    selectedChat === chat.id ? "text-primary-foreground" : "text-foreground"
                  )}>
                    {chat.title}
                  </p>
                  <p className={cn(
                    "text-xs",
                    selectedChat === chat.id ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {chat.date}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Assistant Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">ANZ Policy Assistant</h1>
                <p className="text-sm text-muted-foreground">Ask me about policies and compliance</p>
              </div>
            </div>

            {/* Suggestions Grid */}
            <div className="flex-1 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 max-w-2xl">
                {suggestionCards.map((card) => (
                  <Card
                    key={card.id}
                    className="p-4 cursor-pointer hover:shadow-md transition-shadow border border-border hover:border-primary/30"
                    onClick={() => handleSuggestionClick(card)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", card.iconBg)}>
                        <card.icon className={cn("h-5 w-5", card.iconColor)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground text-sm">{card.title}</h3>
                        <p className="text-xs text-primary mt-1 line-clamp-2">{card.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="pt-4">
              <div className="relative max-w-3xl mx-auto">
                <Input
                  placeholder="Reply..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="pr-12 py-6 rounded-full bg-muted/50 border-border"
                />
                <Button
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                  onClick={handleSend}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
