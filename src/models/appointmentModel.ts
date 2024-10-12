import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the Patient document
interface IPatient extends Document {
  name: string;
  email: string;
  phone: number;
  birthDate: Date;
  gender: string;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: number;
  primaryPhysician: string;
  allergies: string;
  currentMedication: string;
  familyMedicalHistory: string;
  pastMedicalHistory: string;
}

// Define the interface for the Appointment document
interface IAppointment extends Document {
  patient: IPatient;  // Embedded patient object
  schedule: Date;
  reason: string;
  note: string;
  primaryPhysician: string;
  status: "scheduled" | "pending" | "cancelled";
  userId: mongoose.Schema.Types.ObjectId;
  cancellationReason: string;
}

// // Define the Patient schema (or fields you want to embed)
// const patientSchema = new Schema<IPatient>({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: Number,
//     required: true,
//   },
//   birthDate: {
//     type: Date,
//     required: true,
//   },
//   gender: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   occupation: {
//     type: String,
//   },
//   emergencyContactName: {
//     type: String,
//     required: true,
//   },
//   emergencyContactNumber: {
//     type: Number,
//     required: true,
//   },
//   primaryPhysician: {
//     type: String,
//     required: true,
//   },
//   allergies: {
//     type: String,
//   },
//   currentMedication: {
//     type: String,
//   },
//   familyMedicalHistory: {
//     type: String,
//   },
//   pastMedicalHistory: {
//     type: String,
//   }
// });

// Create the Appointment schema
const appointmentSchema = new Schema<IAppointment>({
  
  schedule: {
    type: Date,
    // required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  primaryPhysician: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["scheduled", "pending", "cancelled"], // Define enum options
    // required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient", 
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming there's a User model to reference
    required: true,
  },
  cancellationReason: {
    type: String,
  },
});

// Create the Appointment model with the proper TypeScript type
export const AppointmentModel: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", appointmentSchema);
