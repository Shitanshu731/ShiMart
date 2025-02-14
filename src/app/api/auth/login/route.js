import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const allowedOrigins = [
  "http://localhost:3000", // Development
  "https://mart-kappa.vercel.app", // Production
];

const connectToDatabase = async () => {
  await connectDB();
};

// Handle CORS for preflight requests
export async function OPTIONS(req) {
  const origin = req.headers.get("origin") || "";
  if (!allowedOrigins.includes(origin)) {
    return new Response("CORS Not Allowed", { status: 403 });
  }

  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req) {
  await connectToDatabase(); // Ensure DB connection

  try {
    const { email, password } = await req.json();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": req.headers.get("origin"),
          "Content-Type": "application/json",
        },
      });
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": req.headers.get("origin"),
          "Content-Type": "application/json",
        },
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": req.headers.get("origin"),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": req.headers.get("origin"),
        "Content-Type": "application/json",
      },
    });
  }
}
