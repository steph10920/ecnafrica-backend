import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Volunteer } from "../entities/Volunteer";

const volRepo = () => AppDataSource.getRepository(Volunteer);

export const getVolunteers = async (req: Request, res: Response) => {
  try {
    const list = await volRepo().find({ order: { dateSubmitted: "DESC" } });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const createVolunteer = async (req: Request, res: Response) => {
  try {
    const v = volRepo().create(req.body);
    await volRepo().save(v);
    res.status(201).json(v);
  } catch (err) {
    res.status(400).json({ message: "Bad request", error: err });
  }
};
