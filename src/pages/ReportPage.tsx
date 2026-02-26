import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Upload, Camera, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { addComplaint } from "@/lib/complaintStore";

const severityOptions = ["Low", "Medium", "High", "Critical"];
const districts = ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Tirunelveli", "Erode", "Vellore"];

const ReportPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ description: "", district: "", severity: "", address: "" });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || !form.district || !form.severity || !form.address) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }
    addComplaint({
      location: form.address,
      district: form.district,
      severity: form.severity,
      description: form.description,
      image: imagePreview || undefined,
    });
    toast({ title: "Complaint Submitted! 🎉", description: "Your pothole report has been sent to the respective councillor." });
    navigate("/dashboard");
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2">Report a Pothole</h1>
        <p className="text-muted-foreground mb-8">Fill in the details and pin the exact location on the map.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Map Section */}
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="bg-muted/50 px-5 py-3 flex items-center gap-2 border-b border-border">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Select Location on Map</span>
            </div>
            <div className="h-72 bg-muted flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497511.2343069484!2d79.87933274953!3d13.047985939129728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Select pothole location"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>District *</Label>
              <Select value={form.district} onValueChange={(v) => setForm({ ...form, district: v })}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select district" /></SelectTrigger>
                <SelectContent>
                  {districts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Severity *</Label>
              <Select value={form.severity} onValueChange={(v) => setForm({ ...form, severity: v })}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select severity" /></SelectTrigger>
                <SelectContent>
                  {severityOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Street / Address *</Label>
            <Input placeholder="E.g., Anna Nagar 2nd Street" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="h-11" />
          </div>

          <div className="space-y-2">
            <Label>Description *</Label>
            <Textarea placeholder="Describe the pothole size, depth, and any danger it poses..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Upload Photo</Label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer relative">
              <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              {imagePreview ? (
                <img src={imagePreview} alt="Pothole preview" className="max-h-48 mx-auto rounded-lg" />
              ) : (
                <div className="space-y-2">
                  <Camera className="h-10 w-10 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Click or drag to upload a photo of the pothole</p>
                </div>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full h-12 bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow text-base">
            <Send className="h-4 w-4 mr-2" /> Submit Complaint
          </Button>
        </form>
      </motion.div>
    </DashboardLayout>
  );
};

export default ReportPage;
