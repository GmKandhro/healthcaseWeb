"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Appointment } from "../../types/appwrite.types"; // Assuming you have defined Appointment type in this location
import { AppointmentForm } from "./forms/AppointmentForm"; // Assuming you have this form component for handling appointments
import "react-datepicker/dist/react-datepicker.css";

// Define props interface for better type safety
interface AppointmentModalProps {
  patientId: string; // ID of the patient
  userId: string; // ID of the logged-in user
  appointment?: Appointment; // Appointment data (optional)
  type: "schedule" | "cancel"; // Type of action (schedule or cancel)
  title: string; // Title for the modal (e.g., "Schedule Appointment")
  description: string; // Description of the action (e.g., "Please fill the form to schedule")
}

// AppointmentModal Component
export const AppointmentModal = ({
  patientId,
  userId,
  appointment,
  type,
  title,
  description,
}: AppointmentModalProps) => {
  const [open, setOpen] = useState(false); // State to control modal visibility

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button: Opens modal when clicked */}
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === "schedule" ? "text-green-500" : "text-red-500"}`}
        >
          {type}
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* Appointment Form: Passing necessary props */}
        <AppointmentForm
          userId={userId} // User ID of the person making the appointment
          patientId={patientId} // Patient ID for whom the appointment is being made
          type={type} // Type of appointment (schedule or cancel)
          appointment={appointment} // Existing appointment data (if available)
          setOpen={setOpen} // Function to close modal after form submission
        />
      </DialogContent>
    </Dialog>
  );
};
