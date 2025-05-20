import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true, trim: true, index: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "provider", "admin"], required: true, index: true },
    profilePhoto: { type: String },
    phone: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: {
        validator: (v) => /^(\+91)?[6-9][0-9]{9}$/.test(v),
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    deliveryAddresses: [
      {
        label: { type: String },
        street: String,
        city: String,
        state: String,
        pincode: String,
        location: {
          type: { type: String, enum: ["Point"], default: "Point" },
          coordinates: { type: [Number], required: true },
        },
      },
    ],
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.index({ "address.location": "2dsphere" });
userSchema.index({ "deliveryAddresses.location": "2dsphere" });

const User = mongoose.model("User", userSchema);
export default User;
