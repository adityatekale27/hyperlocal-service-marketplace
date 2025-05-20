import User from "../models/user.model.js";
import ProviderProfile from "../models/providerProfile.model.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

/* Handles user, provider and admin registration */
export const register = async (req, res) => {
  const { name, email, phone, password, role, bio, experience, availability, serviceAreas } = req.body;

  if (!name || !email || !phone || !role || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if user already exists with same email or phone
    const userExists = await User.findOne({ $or: [{ email: email.toLowerCase() }, { phone }] });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash provided password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      role,
    });

    // If role is provider, create provider profile
    let providerProfileData = {};
    if (role === "provider") {
      if (!experience || experience < 0 || !availability || !Array.isArray(availability) || !serviceAreas || !Array.isArray(serviceAreas)) {
        return res.status(400).json({ message: "Missing required fields for Provider" });
      }

      const newProviderProfile = await ProviderProfile.create({
        userId: newUser._id,
        bio: bio || "",
        experience,
        availability,
        serviceAreas,
      });

      providerProfileData = {
        bio: newProviderProfile.bio,
        experience: newProviderProfile.experience,
        availability: newProviderProfile.availability,
        serviceAreas: newProviderProfile.serviceAreas,
      };
    }

    // Generate JWT token using helper method
    const token = generateToken(newUser);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        ...providerProfileData,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/* Handles login via email or phone */
export const login = async (req, res) => {
  const { email, phone, password } = req.body;
  if ((!email && !phone) || !password) {
    return res.status(400).json({ message: "Email or phone and password are required" });
  }

  try {
    // Validate user and password
    const user = await User.findOne(email ? { email: email.toLowerCase() } : { phone }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If user is provider, fetch and include their profile
    let providerProfileData = {};
    if (user.role === "provider") {
      const providerProfile = await ProviderProfile.findOne({ userId: user._id });
      if (providerProfile) {
        providerProfileData = {
          bio: providerProfile.bio,
          experience: providerProfile.experience,
          availability: providerProfile.availability,
          serviceAreas: providerProfile.serviceAreas,
        };
      }
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        ...providerProfileData,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
