// "use client";
//  twilio recovery code ===>  19UZU2EH611S31J9CZ6FTU5R

import { ID, Query } from "node-appwrite";
import { AppointmentModal } from "@/components/AppointmentModal";

import { Appointment } from "../../../types/appwrite.types";

import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import axios from "axios";

//  CREATE APPOINTMENT
export const createAppointment :any = async (
  appointment: CreateAppointmentParams
) => {
  try {
    // console.log("Appointmenttttt data11 ",appointment)
    const response = await axios.post('/api/appointment/createAppointment', appointment);
    
    return response.data;
   
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
};

//  GET RECENT APPOINTMENTS

export const getRecentAppointmentList = async () => {
  try {
    // Fetch all appointments from the API
    const response = await axios.get("http://localhost:3000/api/appointment/getAllAppointments");
    const appointments = response.data;
    // console.log("here is all pointments ",response.data)

    // Initial counts for the different statuses
    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    // Reduce over the appointments to count statuses
    const counts = appointments.reduce(
      (acc: any, appointment: any) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );

    // Prepare the data object to return
    const data = {
      totalCount: appointments.length, // Total number of appointments
      ...counts,
      documents: appointments, // The appointments list itself
    };

    return data
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
    throw new Error("Failed to fetch recent appointments");
  }
};


//  SEND SMS NOTIFICATION
export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    // https://appwrite.io/docs/references/1.5.x/server-nodejs/messaging#createSms
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return parseStringify(message);
  } catch (error) {
    console.error("An error occurred while sending sms:", error);
  }
};


// GET APPOINTMENT
export  const getAppointment = async (appointmentId: string) => {
  try {
    // console.log("appointment is retrieved", appointmentId);
    
    // Add leading slash `/` to the API route
    const appointment = await axios.get(`http://localhost:3000/api/appointment/getAppointment/${appointmentId}`)
    
    // console.log("appointment is retrieved5", appointment);
    return appointment.data;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the appointment:",
      error
    );
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId, 
  // @ts-ignore
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    /* Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
    // console.log(appointmentId)
    // const updatedAppointment = await databases.updateDocument(
    //   DATABASE_ID!,
    //   APPOINTMENT_COLLECTION_ID!,
    //   appointmentId,
    //   appointment
    // );


    // if (!updatedAppointment) throw Error;

    // const smsMessage = `Greetings from CarePulse. ${type === "schedule" ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule!, timeZone).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!, timeZone).dateTime} is cancelled. Reason:  ${appointment.cancellationReason}`}.`;
      
     await sendSMSNotification(userId, smsMessage);
     revalidatePath("/admin");
     return parseStringify(updatedAppointment);*/


    const res = await axios.patch(`/api/appointment/updateAppointment/${appointmentId}`,appointment)
    return res.data.data;

  } catch (error) {
    console.error("An error occurred while scheduling an appointment:", error);
  }
};
