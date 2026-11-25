import { supabase } from "../supabaseClient";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Booking() {
  const [searchParams] = useSearchParams();

  const teams = searchParams.get("teams");
  const date = searchParams.get("date");
  const matchVenue = searchParams.get("venue");

  const [name, setName] = useState("");
  const [tickets, setTickets] = useState(1);
  const [stand, setStand] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({});


  const prices = {
    "General Stands": 1200,
    "East Gallery": 2500,
    "Grand Stand": 5000,
    "VIP Lounge": 12000,
  };

  const totalPrice = (prices[stand] || 0) * tickets;

  async function handleBooking() {
    let newErrors = {};

    if (!name.trim()) {
        newErrors.name = "Please enter your name";
    }

    if (!email.trim()) {
        newErrors.email = "Please enter your email";
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Please enter a valid email";
    }

    if (!mobile.trim()) {
        newErrors.mobile = "Please enter your mobile number";
    }
    else if (!/^[6-9][0-9]{9}$/.test(mobile)) {
        newErrors.mobile = "Enter a valid 10-digit number";
    }

    if (!stand) {
        newErrors.stand = "Please select a ticket type";
    }

    if (isNaN(tickets) || tickets < 1 || tickets > 10) {
        newErrors.tickets = "Select between 1 and 10 tickets";
    }

    if (!teams || !date || !matchVenue) {
        newErrors.match = "Please select a match first";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
        return;
    }

    const { error } = await supabase.from("bookings").insert([
        {
            name: name,
            email: email,
            mobile: mobile,
            tickets: tickets,
            stand: stand,
            venue: matchVenue,
            teams: teams,
            match_date: date,
            totalPrice: totalPrice,
        },
    ]);

    if (error) {
        alert("Booking failed: " + error.message);
    } else {
        alert("Booking Successful!");
    }
}
  return (
    <div className="page">
      <h1>IPL Ticket Booking</h1>

      <div className="card">
        <h2>Match Information</h2>
        <p>Teams: {teams || "No match selected"}</p>
        <p>Date: {date || "Not selected"}</p>
        <p>Venue: {matchVenue || "Not selected"}</p>
      </div>

      <div className="card">
        <h2>Personal Information & Tickets</h2>

        <label>Full Name:</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        {errors.name && <p className="error">{errors.name}</p>}
  
        <br />
        <br />
        

        <label>Email Address:</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      {errors.email && <p className="error">{errors.email}</p>}
        <br />
        <br />

        <label>Mobile Number:</label>
        <br />
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        {errors.mobile && <p className="error">{errors.mobile}</p>}
        <br />
        <br />

        <label>Ticket Type:</label>
        <br />
        <select value={stand} onChange={(e) => setStand(e.target.value)}>
          <option value="">Select Stand</option>
          <option value="General Stands">General Stands - Rs.1,200</option>
          <option value="East Gallery">East Gallery - Rs.2,500</option>
          <option value="Grand Stand">Grand Stand - Rs.5,000</option>
          <option value="VIP Lounge">VIP Lounge - Rs.12,000</option>
        </select>
        {errors.stand && <p className="error">{errors.stand}</p>}
        <br />
        <br />

        <label>Number of Tickets:</label>
        <br />
        <input
          type="number"
          min="1"
          max="10"
          value={tickets}
          onChange={(e) => setTickets(Number(e.target.value))}
        />
        {errors.tickets && <p className="error">{errors.tickets}</p>}
        <h3>Booking Details</h3>
        <p>Price per Ticket: Rs.{prices[stand] || 0}</p>
        <p>Total Amount: Rs.{totalPrice}</p>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Mobile: {mobile}</p>
        <p>Tickets: {tickets}</p>
        <p>Stand: {stand}</p>
      {errors.match && <p className="error">{errors.match}</p>} 
        <button onClick={handleBooking}>Confirm Booking</button>
      </div>
    </div>
  );
}

export default Booking;
