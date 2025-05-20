import mongoose from "mongoose";

/* Stores individual service bookings */
const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Customer who booked
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Provider assigned
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true }, // Service selected
    scheduledTime: { type: Date, required: true }, // When the service is scheduled
    status: { type: String, enum: ["scheduled", "in_progress", "completed", "cancelled"], default: "scheduled", index: true },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending", index: true },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true }, // [lng, lat] format
      },
    },
    amount: { type: Number, required: true, min: 0 },
    notes: { type: String, max: 1000 },
  },
  { timestamps: true }
);

// Enables geospatial queries on location
bookingSchema.index({ "address.location": "2dsphere" });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
