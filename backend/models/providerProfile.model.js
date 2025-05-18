import mongoose from "mongoose";

const providerProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    servicesOfferedIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
    bio: { type: String, maxLength: 1000 },
    experience: { type: Number, required: true, min: 0 },
    isVerified: { type: Boolean, default: false, index: true },
    availability: [
      {
        day: { type: String, enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"], required: true },
        fromTime: { type: Number, required: true },
        toTime: { type: Number, required: true },
      },
    ],
    serviceAreas: [
      {
        label: { type: String },
        location: {
          type: { type: String, enum: ["Point"], default: "Point" },
          coordinates: { type: [Number], required: true },
        },
        radiusMeters: { type: Number, default: 5000, min: 100, max: 20000 },
      },
    ],
  },
  { timestamps: true }
);

providerProfileSchema.index({ "serviceAreas.location": "2dsphere" });

const ProviderProfile = mongoose.model("ProviderProfile", providerProfileSchema);
export default ProviderProfile;
