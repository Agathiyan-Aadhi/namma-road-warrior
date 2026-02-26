import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isCouncillor = searchParams.get("role") === "councillor";
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    // Mock login
    toast({ title: "Welcome back!", description: "Login successful" });
    if (isCouncillor) {
      navigate("/councillor");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <button onClick={() => navigate("/")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </button>

          <div className="flex items-center gap-2 mb-8">
            <div className="h-10 w-10 rounded-lg bg-gradient-hero flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-heading font-bold">Namma Salai</span>
          </div>

          <h1 className="text-3xl font-heading font-bold mb-2">
            {isCouncillor ? "Councillor Login" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isCouncillor
              ? "Access your dashboard to manage road complaints"
              : "Sign in to report potholes and track your rewards"}
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full h-12 bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow text-base">
              Sign In
            </Button>
          </form>

          {!isCouncillor && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button onClick={() => navigate("/register")} className="text-primary font-medium hover:underline">
                Create one
              </button>
            </p>
          )}
        </motion.div>
      </div>

      {/* Right - Visual */}
      <div className="hidden lg:flex flex-1 bg-secondary items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-md"
        >
          <div className="h-24 w-24 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-8 animate-float">
            <MapPin className="h-12 w-12 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-secondary-foreground mb-4">
            {isCouncillor ? "Manage Your Ward" : "Report. Track. Earn."}
          </h2>
          <p className="text-secondary-foreground/70">
            {isCouncillor
              ? "View complaints, approve repairs, and keep your constituency's roads in top shape."
              : "Every pothole you report helps build safer roads for everyone. Earn reward points and redeem them for real cash."}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
