import { NextResponse } from "next/server";
import { AppointmentModel } from "@/models/appointmentModel";
import dbconnect from "@/connectDb";

export async function GET(req: Request,{params}:{params:{id:string}}) {
    await dbconnect();

    try {
      
        const {id} = params
        const appointmentId = id

        if (!appointmentId) {
            return NextResponse.json({ message: "Appointment ID is required" }, { status: 400 });
        }

        // Find the appointment by ID
        const appointment = await AppointmentModel.findById(appointmentId)
        // .populate("userId"); // Optionally populate user data
        // .populate("patient") // Optionally populate patient data

        if (!appointment) {
            return NextResponse.json({ message: "Appointment not found" }, { status: 404 });
        }

        // Return the appointment data
        return NextResponse.json(appointment, { status: 200 });
    } catch (error) {
        console.error("Error fetching appointment:", error);
        // Return an error response
        return NextResponse.json({ message: "Error fetching appointment" }, { status: 500 });
    }
}
