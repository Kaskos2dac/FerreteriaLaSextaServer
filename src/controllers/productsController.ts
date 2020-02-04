import { Request, Response, request} from 'express';

import pool from '../database';

class ProductsController {

  public async list(req: Request, res: Response) {
    try {
      const products = await pool.query('SELECT * FROM products ');
      res.json(products);
    } catch (error) {
      res.json(error);
    }

  }


  public async listWithStock(req: Request, res: Response) {
    try {
      const products = await pool.query('SELECT * FROM products WHERE stock > 0');
      res.json(products);
    } catch (error) {
      res.json(error);
    }

  }

  public async getStockOneProduct( req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const Stockproduct = await pool.query('SELECT stock FROM products WHERE id_product = ?', [id]);
      if (Stockproduct.length > 0) {
        return res.json(Stockproduct[0]);
      }
      res.status(404).json({ text: "the product doesn't exists" });
    } catch (error) {
      res.json(error);
    }
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {

      const { id } = req.params;
      const product = await pool.query('SELECT * FROM products WHERE id_product = ?', [id]);
      if (product.length > 0) {
        return res.json(product[0]);
      }
      res.status(404).json({text: "the product doesn't exists"});
    } catch (error) {
      res.json(error);
    }

  }
  public async create(req: Request, res: Response): Promise<void> {
    await pool.query('INSERT INTO products set ?', [req.body]);
    res.json({ message: 'save product '});
  }
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await pool.query('DELETE FROM products WHERE id_product = ?', [id]);
      res.json({ text: 'the game was deleted ' });
    } catch (error) {
      res.json({ text: 'the game not deleted ' });
    }


  }
  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const product = await pool.query('UPDATE products set ? WHERE id_product = ?', [req.body, id]);
    res.json({ message: 'the game was updating '});
  }
}

const productsController = new ProductsController();
export default productsController;