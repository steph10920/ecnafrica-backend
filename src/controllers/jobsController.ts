import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Job } from "../entities/Job";

const jobRepo = () => AppDataSource.getRepository(Job);

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await jobRepo().find({ order: { datePosted: "DESC" } });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const createJob = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    // Normalize arrays if strings are provided
    if (typeof payload.responsibilities === "string") {
      payload.responsibilities = payload.responsibilities.split("|").map((s: string) => s.trim()).filter(Boolean);
    }
    if (typeof payload.qualifications === "string") {
      payload.qualifications = payload.qualifications.split("|").map((s: string) => s.trim()).filter(Boolean);
    }
    const job = jobRepo().create(payload);
    await jobRepo().save(job);
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: "Bad request", error: err });
  }
};
