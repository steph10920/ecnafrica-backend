import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Donation } from "../entities/Donation";

const donRepo = () => AppDataSource.getRepository(Donation);

export const getDonations = async (req: Request, res: Response) => {
  try {
    const list = await donRepo().find({ order: { dateSubmitted: "DESC" } });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const createDonation = async (req: Request, res: Response) => {
  try {
    // ensure amount is numeric
    const payload = { ...req.body, amount: Number(req.body.amount) };
    const d = donRepo().create(payload);
    await donRepo().save(d);
    res.status(201).json(d);
  } catch (err) {
    res.status(400).json({ message: "Bad request", error: err });
  }
};
