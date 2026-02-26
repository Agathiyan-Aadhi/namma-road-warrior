import { motion } from "framer-motion";
import { MapPin, AlertTriangle, CheckCircle, Clock, Trophy, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const mockComplaints = [
  { id: 1, location: "Anna Nagar 2nd Street", district: "Chennai", status: "pending", date: "2026-02-25", severity: "High" },
  { id: 2, location: "Gandhipuram Main Road", district: "Coimbatore", status: "in_progress", date: "2026-02-23", severity: "Medium" },
  { id: 3, location: "KK Nagar 5th Cross", district: "Madurai", status: "completed", date: "2026-02-20", severity: "Low" },
  { id: 4, location: "Sathyamangalam Road", district: "Erode", status: "completed", date: "2026-02-18", severity: "High" },
];

const statusConfig = {
  pending: { label: "Pending", color: "bg-warning/15 text-warning", icon: Clock },
  in_progress: { label: "In Progress", color: "bg-primary/15 text-primary", icon: TrendingUp },
  completed: { label: "Completed", color: "bg-success/15 text-success", icon: CheckCircle },
};

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-heading font-bold mb-1">Welcome back, User! 👋</h1>
          <p className="text-muted-foreground">Here's your pothole reporting activity overview.</p>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Reports", value: "12", icon: AlertTriangle, color: "text-primary" },
            { label: "Pending", value: "3", icon: Clock, color: "text-warning" },
            { label: "Repaired", value: "8", icon: CheckCircle, color: "text-success" },
            { label: "Reward Points", value: "450", icon: Trophy, color: "text-accent" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl bg-card p-5 shadow-card"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-3xl font-heading font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => navigate("/report")} className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow">
            <MapPin className="h-4 w-4 mr-2" /> Report Pothole
          </Button>
          <Button variant="outline" onClick={() => navigate("/leaderboard")}>
            <Trophy className="h-4 w-4 mr-2" /> View Leaderboard
          </Button>
        </div>

        {/* Recent Complaints */}
        <div>
          <h2 className="text-xl font-heading font-semibold mb-4">Recent Complaints</h2>
          <div className="rounded-xl bg-card shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Location</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">District</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Severity</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockComplaints.map((c) => {
                    const s = statusConfig[c.status as keyof typeof statusConfig];
                    return (
                      <tr key={c.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="px-5 py-4 font-medium">{c.location}</td>
                        <td className="px-5 py-4 text-muted-foreground">{c.district}</td>
                        <td className="px-5 py-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            c.severity === "High" ? "bg-destructive/15 text-destructive" :
                            c.severity === "Medium" ? "bg-warning/15 text-warning" :
                            "bg-muted text-muted-foreground"
                          }`}>{c.severity}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${s.color}`}>
                            <s.icon className="h-3 w-3" /> {s.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-muted-foreground">{c.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
