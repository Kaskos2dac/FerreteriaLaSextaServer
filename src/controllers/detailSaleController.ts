import { Request, Response } from 'express';

import pool from '../database';

class DetailSaleController {
  public async getLastID(req: Request, res: Response) {
    try {
      const id = await pool.query('SELECT max(id_Sale) FROM sales');
      res.json(id);
    } catch (error) {
      res.json(error);
    }
  }


  public async createwithprocedure(req: Request, res: Response): Promise<void> {
    try {
      const { id_product, id_Sale, id_Client, numberProducts, priceProduct} = req.body;
      const query = `
        SET @id_product = ?;
        SET @id_Sale = ?;
        SET @id_Client = ?;
        SET @numberProducts = ?;
        SET @priceProduct = ?;

        CALL sp_Detailsale(@id_product, @id_Sale, @id_Client,
                      @numberProducts, @priceProduct);
      `;
      await pool.query(query, [id_product, id_Sale, id_Client, numberProducts, priceProduct]);
      res.status(200).json({ message: 'save Detailsale ' });
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

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const client = await pool.query('SELECT * FROM clients WHERE id_client = ?', [id]);
      if (client.length > 0) {
        return res.json(client[0]);
      }
      res.status(404).json({ text: "the saleDetail doesn't exists" });
    } catch (error) {
      res.json(error);
    }
  }

  public async getOneForBill(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const detailSale = await pool.query(`SELECT detailsale.id_product, detailsale.cantidad, products.title, products.price
FROM detailsale
INNER JOIN products ON products.id_product = detailsale.id_product
WHERE detailsale.id_Sale = ?`, [id]);
      if (detailSale.length > 0) {
        return res.json(detailSale);
      }
      res.status(404).json({ text: "the saleDetail doesn't exists" });
    } catch (error) {
      res.json(error);
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query('INSERT INTO clients set ?', [req.body]);
      res.json({ message: 'save client ' });
    } catch (error) {
      res.json(error);
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const client = await pool.query('DELETE FROM clients WHERE id_client = ?', [id]);
    res.json({ text: "the saleDetail was deleted " });
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const client = await pool.query('UPDATE clients set ? WHERE id_client = ?', [req.body, id]);
    res.json({ message: "the saleDetail was updating " });
  }
}

const detailSaleController = new DetailSaleController();

export default detailSaleController;
