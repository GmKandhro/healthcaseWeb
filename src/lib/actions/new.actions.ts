import axios from "axios";

export  const getAppointment = async (appointmentId: string) => {
    try {
      console.log("appointment is retrieved", appointmentId);
      
      // Add leading slash `/` to the API route
    //   console.log("heeele")
    //   console.log("heeele12")
      const appointment = await axios.get(`http://localhost:3000/api/appointment/getAppointment/${appointmentId}`)
      
    //   console.log("appointment is retrieved5", appointment);
      return appointment.data;
    } catch (error) {
      console.error(
        "An error occurred while retrieving the appointment:",
        error
      );
    }
  };