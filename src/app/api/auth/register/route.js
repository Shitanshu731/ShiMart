import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const allowedOrigins = [
  "http://localhost:3000", // Development
  "https://mart-kappa.vercel.app", // Production
];

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
  await connectDB(); // Ensure DB connection

  try {
    const { userName, email, password } = await req.json();

    // Validate input
    if (!email || !password || !userName) {
      return new Response(
        JSON.stringify({
          message: "Email, password, and username are required",
        }),
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": req.headers.get("origin"),
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": req.headers.get("origin"),
          "Content-Type": "application/json",
        },
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ email, password: hashedPassword, userName });
    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": req.headers.get("origin"),
          "Content-Type": "application/json",
        },
      }
    );
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
