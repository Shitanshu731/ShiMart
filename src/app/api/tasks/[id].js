import connectDB from "../../../lib/db";
import { authenticate, errorHandler } from "../../../lib/middleware";
import Task from "../../../models/Task";

export default errorHandler(
  authenticate(async function handler(req, res) {
    await connectDB();
    const { id } = req.query;

    if (req.method === "PUT") {
      const task = await Task.findOneAndUpdate(
        { _id: id, userId: req.user.id },
        req.body,
        { new: true }
      );
      if (!task) return res.status(404).json({ message: "Task not found" });

      return res.status(200).json(task);
    }

    if (req.method === "DELETE") {
      const task = await Task.findOneAndDelete({
        _id: id,
        userId: req.user.id,
      });
      if (!task) return res.status(404).json({ message: "Task not found" });

      return res.status(204).end();
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  })
);
