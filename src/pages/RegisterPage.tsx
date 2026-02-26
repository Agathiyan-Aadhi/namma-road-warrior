import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const districts = [
  "Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli",
  "Tirunelveli", "Erode", "Vellore", "Thanjavur", "Dindigul",
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", district: "", password: "" });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.district) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    toast({ title: "Account Created!", description: "Welcome to Namma Salai" });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
          <button onClick={() => navigate("/")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </button>

          <div className="flex items-center gap-2 mb-8">
            <div className="h-10 w-10 rounded-lg bg-gradient-hero flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-heading font-bold">Namma Salai</span>
          </div>

          <h1 className="text-3xl font-heading font-bold mb-2">Create Account</h1>
          <p className="text-muted-foreground mb-8">Join the movement for better roads</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-email">Email Address *</Label>
              <Input id="reg-email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="h-11" />
            </div>
            <div className="space-y-2">
              <Label>District *</Label>
              <Select value={form.district} onValueChange={(v) => setForm({ ...form, district: v })}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select your district" /></SelectTrigger>
                <SelectContent>
                  {districts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-password">Password *</Label>
              <div className="relative">
                <Input id="reg-password" type={showPassword ? "text" : "password"} placeholder="Min 8 characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="h-11 pr-12" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full h-12 bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow text-base mt-2">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="text-primary font-medium hover:underline">Sign in</button>
          </p>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 bg-secondary items-center justify-center p-12">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="text-center max-w-md">
          <div className="h-24 w-24 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-8 animate-float">
            <MapPin className="h-12 w-12 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-secondary-foreground mb-4">Join 25,000+ Citizens</h2>
          <p className="text-secondary-foreground/70">Be part of the community making our roads safer. Report potholes, earn rewards, and see real change in your neighborhood.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
