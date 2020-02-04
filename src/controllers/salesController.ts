import { Request, Response } from 'express';

import pool from '../database';

class SalesController {


  public async list(req: Request, res: Response) {
    try {
      const sales = await pool.query(`SELECT sales.id_Sale, sales.id_client, sales.datesale, sales.totalProducts, sales.credit, sales.totalPrice, 
clients.nameClient, clients.lastName
FROM sales 
INNER JOIN clients ON sales.id_client = clients.id_client 
ORDER BY ( sales.id_Sale) DESC`);
      res.json(sales);
      console.log(sales);
    } catch (error) {
      res.json(error);
    }
  }
  public async getTotalSales(req: Request, res: Response) {
    try {
      const sales = await pool.query(`SELECT SUM(totalPrice) as total FROM sales`);
      if (sales.length > 0) {
        return res.json(sales);
      }
        res.status(404).json({ text: "the sale doesn't exists" });
    } catch (error) {
      res.json(error);
    }
  }
  public async getTotalAllSalesWithCredit(req: Request, res: Response) {
    try {
      const sales = await pool.query(`SELECT SUM(totalPrice) as total FROM sales WHERE credit = 'Si' AND creditState = 'Abierta'`);
      if (sales.length > 0) {
        return res.json(sales);
      }
        res.status(404).json({ text: "the sale doesn't exists" });
    } catch (error) {
      res.json(error);
    }
  }
  public async getTotalAllSalesWithoutCredit(req: Request, res: Response) {
    try {
      const sales = await pool.query(`SELECT SUM(totalPrice) as total FROM sales WHERE credit = 'No' AND creditState = 'Cerrada';`);
      if (sales.length > 0) {
        return res.json(sales);
      }
        res.status(404).json({ text: "the sale doesn't exists" });
    } catch (error) {
      res.json(error);
    }
  }
  public async getTotalSaleForDay(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(id);
      const sales = await pool.query('SELECT SUM(totalPrice) as total FROM sales WHERE dateSale = ?', [id]);
      if (sales.length > 0) {
        return res.json(sales);
      }
        res.status(404).json({ text: "the detailSale doesn't exists" });
    } catch (error) {
      res.json(error);
    }
  }

  public async getTotalSaleForDayWitchCredit(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(id);
      const sales = await pool.query(`SELECT SUM(totalPrice) as total FROM sales WHERE credit = 'Si' AND creditState = 'Abierta' AND dateSale = ?`, [id]);
      if (sales.length > 0) {
        return res.json(sales);
      }
        res.status(404).json({ text: "the detailSale doesn't exists" });
    } catch (error) {
      res.json(error);
    }
  }

  public async listSalesForGraphic(req: Request, res: Response) {
    try {
      const sales = await pool.query(`SELECT count(id_Sale) as cantidadventas, sum(totalPrice) as totalventas, id_Sale, totalPrice, dateSale FROM sales
group by (sales.dateSale)
ORDER BY ( sales.id_Sale) DESC`);
      res.json(sales);
      console.log(sales);
    } catch (error) {
      res.json(error);
    }
  }

  public async listSalesWithClientHadCredit(req: Request, res: Response) {
    try {
      const sales = await pool.query(`SELECT clients.nameClient, clients.lastName, sales.dateSale, sales.id_Sale, sales.creditState, sales.credit, sales.totalPrice
      FROM clients INNER JOIN Sales ON sales.id_Client = clients.id_client
      WHERE sales.credit = 'Si' AND sales.creditState = 'Abierta'`);
      res.json(sales);
      console.log(sales);
    } catch (error) {
      res.json(error);
    }
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const sale = await pool.query('SELECT * FROM sales WHERE id_Sale = ?', [id]);
      if (sale.length > 0) {
        return res.json(sale[0]);
      }
      res.status(404).json({ text: "the sale doesn't exists" });
    } catch (error) {
      res.json(error);
    }
  }

  public async getOneSaleForBill(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const sale = await pool.query(`SELECT sales.id_Sale, sales.id_client, sales.datesale, sales.totalProducts, sales.credit, sales.totalPrice, 
      clients.nameClient, clients.lastName, clients.dni, clients.phone
      FROM sales 
      INNER JOIN clients ON sales.id_client = clients.id_client 
      WHERE sales.id_Sale = ?`, [id]);
      if (sale.length > 0) {
        return res.json(sale[0]);
      }
      res.status(404).json({ text: "the sale doesn't exists" });
    } catch (error) {
      res.json(error);
    }
  }

  public async getDetailSaleWitchId(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      console.log(req.params);
      const sale = await pool.query(
        `SELECT detailsale.precio, detailsale.cantidad, products.title, sales.credit
FROM detailsale
INNER JOIN sales ON sales.id_sale = detailsale.id_Sale
INNER JOIN products ON products.id_product = detailsale.id_product
WHERE detailsale.id_Sale = ?`,
        [id]
      );
      if (sale.length > 0) {
        return res.json(sale);
      }
      res.status(404).json({ text: "the detailSale doesn't exists" });
    } catch (error) {
      res.json(error);
    }
  }
  

  public async getToday(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      console.log(req.params);
      const sale = await pool.query(
        `SELECT sales.id_Sale, sales.id_client, sales.datesale, sales.totalProducts, sales.credit, sales.totalPrice, 
clients.nameClient, clients.lastName,
detailsale.id_product,detailsale.precio,
products.title
FROM sales 
INNER JOIN clients ON sales.id_client = clients.id_client  JOIN detailsale ON detailsale.id_Sale = sales.id_sale
JOIN products ON detailsale.id_product = products.id_product
WHERE sales.datesale = ?`,
        [id]
      );
      if (sale.length > 0) {
        return res.json(sale);
      }
      res.status(404).json({ text: "the sale doesn't exists" });
    } catch (error) {
      res.json(error);
    }
  }

  public async createwithprocedure(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);
      const { id_Client, dateSale, totalProducts, credit, totalPrice, creditState } = req.body;
      const query = `
        SET @id_Client = ?;
        SET @dateSale = ?;
        SET @totalProducts = ?;
        SET @credit = ?;
        SET @creditState = ?;
        SET @totalPrice = ?;
        CALL sp_Sale( @id_Client, @dateSale, @totalProducts, @credit, @creditState, @totalPrice);`;
      await pool.query(query, [id_Client, dateSale, totalProducts, credit, creditState, totalPrice]);
      res.json({ message: 'save sale ' });
    } catch (error) {
      console.error(error);
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    console.log(req.body);
    await pool.query('INSERT INTO sales set ?', [req.body]);
    res.json({ message: 'save sale ' });
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const sale = await pool.query('DELETE FROM sales WHERE id_Sale = ?', [id]);
    res.json({ text: 'the sale was deleted ' });
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      
      const { id } = req.params;
      console.log(id);
      const sale = await pool.query(`UPDATE sales SET credit = 'No', creditState = 'Cerrada' WHERE id_Sale = ?`, [req.body.id_Sale, id]);
      res.json({ text: "the sale was updating " });
    } catch (error) {
      res.json(error);
    }
  }
}

const salesController = new SalesController();

export default salesController;
