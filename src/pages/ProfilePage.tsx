import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, User, Trophy, Wallet, Edit2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";

const ProfilePage = () => {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "User Demo",
    email: "user@example.com",
    phone: "+91 98765 43210",
    district: "Chennai",
  });

  const handleSave = () => {
    setEditing(false);
    toast({ title: "Profile Updated!", description: "Your changes have been saved." });
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl md:text-3xl font-heading font-bold">My Profile</h1>

        {/* Avatar + Stats */}
        <div className="rounded-xl bg-card p-6 shadow-card flex flex-col sm:flex-row items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground text-2xl font-heading font-bold">
            {profile.name.charAt(0)}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-heading font-bold">{profile.name}</h2>
            <p className="text-muted-foreground text-sm">{profile.district} District</p>
          </div>
          <div className="flex gap-6 text-center">
            <div>
              <p className="text-2xl font-heading font-bold text-primary">12</p>
              <p className="text-xs text-muted-foreground">Reports</p>
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-success">8</p>
              <p className="text-xs text-muted-foreground">Repaired</p>
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-accent-foreground">450</p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
          </div>
        </div>

        {/* Rewards */}
        <div className="rounded-xl bg-card p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold flex items-center gap-2"><Trophy className="h-5 w-5 text-primary" /> Reward Points</h3>
            <Button variant="outline" size="sm" disabled>
              <Wallet className="h-4 w-4 mr-1" /> Withdraw (min 500 pts)
            </Button>
          </div>
          <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
            <div className="h-full bg-gradient-hero rounded-full transition-all" style={{ width: "90%" }} />
          </div>
          <p className="text-sm text-muted-foreground mt-2">450 / 500 points to next withdrawal</p>
        </div>

        {/* Profile Form */}
        <div className="rounded-xl bg-card p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-heading font-semibold">Personal Details</h3>
            {editing ? (
              <Button size="sm" onClick={handleSave}><Save className="h-4 w-4 mr-1" /> Save</Button>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setEditing(true)}><Edit2 className="h-4 w-4 mr-1" /> Edit</Button>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={profile.name} disabled={!editing} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={profile.email} disabled={!editing} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={profile.phone} disabled={!editing} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>District</Label>
              <Input value={profile.district} disabled={!editing} onChange={(e) => setProfile({ ...profile, district: e.target.value })} />
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ProfilePage;
