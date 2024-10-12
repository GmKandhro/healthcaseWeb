import { NextResponse } from "next/server";
import { AppointmentModel } from "@/models/appointmentModel";
import dbconnect from "@/connectDb";

export async function GET() {
    await dbconnect();

    try {
        // Fetch all appointments
        const appointments = await AppointmentModel.find({}).populate('patient');


        if (!appointments || appointments.length === 0) {
            return NextResponse.json({ message: "No appointments found" }, { status: 404 });
        }

        // Return the list of appointments
        return NextResponse.json(appointments, { status: 200 });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        // Return an error response
        return NextResponse.json({ message: "Error fetching appointments" }, { status: 500 });
    }
}
