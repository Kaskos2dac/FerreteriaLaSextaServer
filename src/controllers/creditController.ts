import { Request, Response } from 'express';

import pool from '../database';

class CreditController {

  public async getCreditClient(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const credit = await pool.query(`SELECT TotalCredit FROM credit WHERE ${id} = id_Client`);
        res.json(credit);
    } catch (error) {
      res.json(error);
    }
  }


  public async list(req: Request, res: Response) {
    try {
      const clients = await pool.query('SELECT * FROM clients');
      res.json(clients);
    } catch (error) {
      res.json(error);
    }
  }


  public async create(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);
      await pool.query('INSERT INTO clients set ?', [req.body]);
      res.json({ message: 'save client ' });
    } catch (error) {
      res.json(error);
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const client = await pool.query('DELETE FROM clients WHERE id_client = ?', [id]);
    res.json({ text: 'the client was deleted ' });
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const client = await pool.query('UPDATE clients set ? WHERE id_client = ?', [req.body, id]);
    res.json({ message: 'the client was updating ' });
  }
}

const creditController = new CreditController();

export default creditController;
