import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, CheckCircle, Clock, AlertTriangle, Eye, LogOut, Menu, X, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const mockComplaints = [
  { id: 1, user: "Priya Sharma", location: "Anna Nagar 2nd Street", district: "Chennai", severity: "High", status: "pending", date: "2026-02-25", description: "Large pothole near school zone, 2ft wide" },
  { id: 2, user: "Rajesh Kumar", location: "Gandhipuram Main Road", district: "Coimbatore", severity: "Critical", status: "pending", date: "2026-02-24", description: "Deep pothole causing accidents" },
  { id: 3, user: "Anitha Devi", location: "KK Nagar 5th Cross", district: "Madurai", severity: "Medium", status: "in_progress", date: "2026-02-23", description: "Multiple small potholes" },
  { id: 4, user: "Karthik Rajan", location: "Sathy Road Junction", district: "Erode", severity: "Low", status: "completed", date: "2026-02-20", description: "Minor road damage after rain" },
];

const statusConfig = {
  pending: { label: "Pending", color: "bg-warning/15 text-warning" },
  in_progress: { label: "In Progress", color: "bg-primary/15 text-primary" },
  completed: { label: "Completed", color: "bg-success/15 text-success" },
};

const CouncillorPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [complaints, setComplaints] = useState(mockComplaints);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleMarkComplete = (id: number) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "completed" } : c))
    );
    toast({ title: "Repair Completed! ✅", description: "Reward points have been credited to the complainant." });
  };

  const handleStartRepair = (id: number) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "in_progress" } : c))
    );
    toast({ title: "Repair Started", description: "Status updated to In Progress." });
  };

  const pending = complaints.filter((c) => c.status === "pending").length;
  const inProgress = complaints.filter((c) => c.status === "in_progress").length;
  const completed = complaints.filter((c) => c.status === "completed").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary text-secondary-foreground px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-hero flex items-center justify-center">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-lg font-heading font-bold">Namma Salai</span>
            <p className="text-xs text-secondary-foreground/60">Councillor Dashboard</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-secondary-foreground/70 hover:text-secondary-foreground">
          <LogOut className="h-4 w-4 mr-1" /> Logout
        </Button>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold mb-1">Welcome, Councillor 👋</h1>
            <p className="text-muted-foreground">Manage road repair complaints in your jurisdiction.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-card p-5 shadow-card flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-warning/15 flex items-center justify-center"><Clock className="h-6 w-6 text-warning" /></div>
              <div><p className="text-sm text-muted-foreground">Pending</p><p className="text-2xl font-heading font-bold">{pending}</p></div>
            </div>
            <div className="rounded-xl bg-card p-5 shadow-card flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/15 flex items-center justify-center"><TrendingUp className="h-6 w-6 text-primary" /></div>
              <div><p className="text-sm text-muted-foreground">In Progress</p><p className="text-2xl font-heading font-bold">{inProgress}</p></div>
            </div>
            <div className="rounded-xl bg-card p-5 shadow-card flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-success/15 flex items-center justify-center"><CheckCircle className="h-6 w-6 text-success" /></div>
              <div><p className="text-sm text-muted-foreground">Completed</p><p className="text-2xl font-heading font-bold">{completed}</p></div>
            </div>
          </div>

          {/* Complaints Table */}
          <div className="rounded-xl bg-card shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-lg font-heading font-semibold">All Complaints</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Complainant</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Location</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Severity</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Date</th>
                    <th className="text-right px-5 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((c) => {
                    const s = statusConfig[c.status as keyof typeof statusConfig];
                    return (
                      <tr key={c.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="px-5 py-4 font-medium">{c.user}</td>
                        <td className="px-5 py-4 text-muted-foreground">{c.location}</td>
                        <td className="px-5 py-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            c.severity === "Critical" ? "bg-destructive/15 text-destructive" :
                            c.severity === "High" ? "bg-primary/15 text-primary" :
                            c.severity === "Medium" ? "bg-warning/15 text-warning" :
                            "bg-muted text-muted-foreground"
                          }`}>{c.severity}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full ${s.color}`}>{s.label}</span>
                        </td>
                        <td className="px-5 py-4 text-muted-foreground">{c.date}</td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {c.status === "pending" && (
                              <Button size="sm" variant="outline" onClick={() => handleStartRepair(c.id)}>Start Repair</Button>
                            )}
                            {c.status === "in_progress" && (
                              <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90" onClick={() => handleMarkComplete(c.id)}>
                                <CheckCircle className="h-3 w-3 mr-1" /> Complete
                              </Button>
                            )}
                            {c.status === "completed" && (
                              <span className="text-xs text-success">✅ Done</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CouncillorPage;
