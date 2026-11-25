import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBookings() {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        alert(error.message);
      } else {
        setBookings(data || []);
      }
      setLoading(false);
    }

    getBookings();
  }, []);

  if (loading) {
    return <div>Loading booking history...</div>;
  }

 return (
    <div className="page">
        <h1>Booking History</h1>

        {bookings.length === 0 ? (
            <p>No bookings found.</p>
        ) : (
            bookings.map((booking) => (
                <div className="card" key={booking.id}>
                    <h3>{booking.name}</h3>
                    <p>Email: {booking.email}</p>
                    <p>Mobile: {booking.mobile}</p>
                    <p>Teams: {booking.teams}</p>
                    <p>Match Date: {booking.match_date}</p>
                    <p>Venue: {booking.venue}</p>
                    <p>Ticket Type: {booking.stand}</p>
                    <p>Number of Tickets: {booking.tickets}</p>
                    <p>Total Amount: Rs. {booking.totalPrice}</p>
                </div>
            ))
        )}
    </div>
);
}

export default BookingHistory;
