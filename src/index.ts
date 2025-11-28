import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import jobsRouter from "./routes/jobs";
import volunteersRouter from "./routes/volunteers";
import donationsRouter from "./routes/donations";

dotenv.config();

const PORT = +(process.env.PORT || 5000);

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized.");

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.get("/", (_, res) => res.send("ECN Africa MySQL Backend is running!"));

    app.use("/api/jobs", jobsRouter);
    app.use("/api/volunteers", volunteersRouter);
    app.use("/api/donations", donationsRouter);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
  }
})();
