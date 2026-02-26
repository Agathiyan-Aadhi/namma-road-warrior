export interface Complaint {
  id: number;
  user: string;
  location: string;
  district: string;
  severity: string;
  status: "pending" | "in_progress" | "completed";
  date: string;
  description: string;
  image?: string;
}

const STORAGE_KEY = "namma_salai_complaints";

export const getComplaints = (): Complaint[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const addComplaint = (complaint: Omit<Complaint, "id" | "date" | "status" | "user">): Complaint => {
  const complaints = getComplaints();
  const newComplaint: Complaint = {
    ...complaint,
    id: Date.now(),
    user: "Current User",
    status: "pending",
    date: new Date().toISOString().split("T")[0],
  };
  complaints.unshift(newComplaint);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
  return newComplaint;
};

export const updateComplaintStatus = (id: number, status: Complaint["status"]) => {
  const complaints = getComplaints();
  const updated = complaints.map((c) => (c.id === id ? { ...c, status } : c));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};
