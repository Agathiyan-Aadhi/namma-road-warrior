import { motion } from "framer-motion";
import { Trophy, Medal, Crown, TrendingUp, Star } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const leaderboardData = [
  { rank: 1, name: "Priya Sharma", district: "Chennai", complaints: 45, repaired: 38, points: 1900 },
  { rank: 2, name: "Rajesh Kumar", district: "Coimbatore", complaints: 38, repaired: 32, points: 1600 },
  { rank: 3, name: "Anitha Devi", district: "Madurai", complaints: 34, repaired: 28, points: 1400 },
  { rank: 4, name: "Karthik Rajan", district: "Salem", complaints: 29, repaired: 24, points: 1200 },
  { rank: 5, name: "Meena Lakshmi", district: "Tiruchirappalli", complaints: 25, repaired: 20, points: 1000 },
  { rank: 6, name: "Suresh Babu", district: "Erode", complaints: 22, repaired: 18, points: 900 },
  { rank: 7, name: "Divya Raman", district: "Vellore", complaints: 19, repaired: 15, points: 750 },
  { rank: 8, name: "Vijay Anand", district: "Thanjavur", complaints: 16, repaired: 12, points: 600 },
  { rank: 9, name: "Lakshmi Priya", district: "Dindigul", complaints: 14, repaired: 10, points: 500 },
  { rank: 10, name: "Arun Prasad", district: "Tirunelveli", complaints: 12, repaired: 8, points: 400 },
];

const rankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="h-5 w-5 text-accent" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-muted-foreground" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-primary" />;
  return <span className="text-sm font-bold text-muted-foreground w-5 text-center">{rank}</span>;
};

const LeaderboardPage = () => {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold mb-1">Leaderboard 🏆</h1>
          <p className="text-muted-foreground">Top citizens making our roads safer. Earn points by reporting valid potholes.</p>
        </div>

        {/* Top 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {leaderboardData.slice(0, 3).map((user, i) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl p-6 text-center shadow-card ${
                i === 0 ? "bg-gradient-hero text-primary-foreground shadow-glow" : "bg-card"
              }`}
            >
              <div className="flex justify-center mb-3">{rankIcon(user.rank)}</div>
              <div className={`h-14 w-14 rounded-full mx-auto mb-3 flex items-center justify-center text-lg font-bold ${
                i === 0 ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"
              }`}>
                {user.name.charAt(0)}
              </div>
              <h3 className={`font-heading font-semibold text-lg ${i === 0 ? "" : "text-foreground"}`}>{user.name}</h3>
              <p className={`text-sm mb-3 ${i === 0 ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{user.district}</p>
              <div className="flex items-center justify-center gap-1">
                <Star className={`h-4 w-4 ${i === 0 ? "text-primary-foreground" : "text-accent"}`} />
                <span className="text-2xl font-heading font-bold">{user.points}</span>
                <span className={`text-xs ${i === 0 ? "text-primary-foreground/70" : "text-muted-foreground"}`}>pts</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Table */}
        <div className="rounded-xl bg-card shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">Rank</th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">Name</th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">District</th>
                  <th className="text-center px-5 py-3 font-medium text-muted-foreground">Complaints</th>
                  <th className="text-center px-5 py-3 font-medium text-muted-foreground">Repaired</th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user) => (
                  <tr key={user.rank} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="px-5 py-4"><div className="flex items-center">{rankIcon(user.rank)}</div></td>
                    <td className="px-5 py-4 font-medium">{user.name}</td>
                    <td className="px-5 py-4 text-muted-foreground">{user.district}</td>
                    <td className="px-5 py-4 text-center">{user.complaints}</td>
                    <td className="px-5 py-4 text-center text-success">{user.repaired}</td>
                    <td className="px-5 py-4 text-right font-heading font-bold text-primary">{user.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reward Info */}
        <div className="rounded-xl bg-card p-6 shadow-card">
          <h2 className="text-lg font-heading font-semibold mb-3">Reward Points System</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="rounded-lg bg-muted p-4">
              <p className="font-medium mb-1">Valid Report</p>
              <p className="text-primary font-heading font-bold text-lg">+50 pts</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="font-medium mb-1">Pothole Repaired</p>
              <p className="text-success font-heading font-bold text-lg">+100 pts</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="font-medium mb-1">False Report</p>
              <p className="text-destructive font-heading font-bold text-lg">-30 pts</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="font-medium mb-1">Redeem 500 pts</p>
              <p className="text-accent-foreground font-heading font-bold text-lg">₹100</p>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default LeaderboardPage;
