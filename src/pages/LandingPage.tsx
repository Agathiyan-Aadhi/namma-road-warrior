import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Camera, Trophy, Shield, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-road.jpg";

const stats = [
  { label: "Potholes Reported", value: "12,450+" },
  { label: "Roads Repaired", value: "8,320+" },
  { label: "Active Users", value: "25,000+" },
  { label: "Districts Covered", value: "38" },
];

const features = [
  {
    icon: Camera,
    title: "Report Potholes",
    description: "Snap a photo, pin the location on the map, and submit your complaint in seconds.",
  },
  {
    icon: MapPin,
    title: "Accurate Location",
    description: "Use Google Maps integration to pinpoint the exact pothole location for faster repairs.",
  },
  {
    icon: Trophy,
    title: "Earn Rewards",
    description: "Get reward points for valid complaints. Redeem points for real money withdrawals.",
  },
  {
    icon: Shield,
    title: "Track Progress",
    description: "Monitor your complaints from submission to repair completion in real-time.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-hero flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-heading font-bold text-foreground">Namma Salai</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Impact</a>
            <a href="#how" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/login")}>Log In</Button>
            <Button onClick={() => navigate("/register")} className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Indian road with potholes" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        <div className="container relative z-10 mx-auto px-6 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Innovation Practicum Project</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight mb-6">
              Fix Our Roads,{" "}
              <span className="text-gradient">Earn Rewards</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
              Report potholes on public roads, track repairs, and earn reward points. 
              Together, let's make our streets safer for everyone.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow text-base px-8"
              >
                Report a Pothole <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/login?role=councillor")}
                className="text-base px-8"
              >
                Councillor Login
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl bg-card p-6 shadow-card text-center"
              >
                <p className="text-3xl md:text-4xl font-heading font-bold text-gradient">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">How Namma Salai Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A simple 4-step process to report potholes and earn rewards for making our roads safer.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-xl bg-card p-6 shadow-card hover:shadow-elevated transition-shadow cursor-pointer"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-gradient-hero group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-lg font-heading font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">Step by Step</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              { step: "01", title: "Sign Up & Login", desc: "Create your account as a public user or councillor." },
              { step: "02", title: "Report Pothole", desc: "Take a photo, select location on the map, and submit." },
              { step: "03", title: "Councillor Reviews", desc: "The area councillor receives the complaint and initiates repair." },
              { step: "04", title: "Earn Rewards", desc: "Once repaired, you earn reward points redeemable for cash." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-6 items-start"
              >
                <span className="text-4xl font-heading font-bold text-primary/60">{item.step}</span>
                <div>
                  <h3 className="text-xl font-heading font-semibold">{item.title}</h3>
                  <p className="text-secondary-foreground/70 mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <MapPin className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-heading font-bold">Namma Salai</span>
          </div>
          <p className="text-sm text-muted-foreground">Innovation Practicum — Pothole Detection System</p>
          <p className="text-xs text-muted-foreground mt-2">© 2026 Namma Salai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
