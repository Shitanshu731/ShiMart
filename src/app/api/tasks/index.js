import connectDB from "../../../lib/db";
import { authenticate, errorHandler } from "../../../lib/middleware";
import Task from "../../../models/Task";

export default errorHandler(
  authenticate(async function handler(req, res) {
    await connectDB();

    if (req.method === "GET") {
      const tasks = await Task.find({ userId: req.user.id });
      return res.status(200).json(tasks);
    }

    if (req.method === "POST") {
      const { title, description, status } = req.body;

      if (!title) return res.status(400).json({ message: "Title is required" });

      const task = await Task.create({
        title,
        description,
        status,
        userId: req.user.id,
      });
      return res.status(201).json(task);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  })
);
