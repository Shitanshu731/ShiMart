import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const connectToDatabase = async () => {
  await connectDB();
};

export async function POST(req) {
  await connectToDatabase(); // Ensure DB connection

  const { userName, email, password } = await req.json();

  // Validate input
  if (!email || !password || !userName) {
    return new Response(
      JSON.stringify({ message: "Email, password, and username are required" }),
      {
        status: 400,
      }
    );
  }

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 400,
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
    }
  );
}
