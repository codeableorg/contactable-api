import { Request, Response } from "express";
import { ContactModel, type CreateContact } from "../models/contact.model";

export class ContactController {
  static async index(req: Request, res: Response) {
    const search = req.query.search as string | undefined;
    const contacts = await ContactModel.getAll(search);
    res.json({ contacts });
  }

  static async show(req: Request, res: Response) {
    try {
      const contact = await ContactModel.getById(req.params.id);
      res.json({ contact });
    } catch (error) {
      res.status(404).json({ error: "Contact not found" });
    }
  }

  static async favorites(req: Request, res: Response) {
    const contacts = await ContactModel.getFavorites();
    res.json({ contacts });
  }

  static async create(req: Request, res: Response) {
    try {
      const contact = await ContactModel.create(req.body as CreateContact);
      res.status(201).json({ contact });
    } catch (error) {
      res.status(400).json({ error: "Invalid contact data" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const contact = await ContactModel.update(
        req.params.id,
        req.body as CreateContact
      );
      res.json({ contact });
    } catch (error) {
      res.status(400).json({ error: "Invalid contact data" });
    }
  }

  static async toggleFavorite(req: Request, res: Response) {
    const contact = await ContactModel.toggleFavorite(req.params.id);
    res.json({ contact });
  }

  static async delete(req: Request, res: Response) {
    await ContactModel.delete(req.params.id);
    res.status(204).send();
  }
}
