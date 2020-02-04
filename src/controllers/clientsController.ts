import { Request, Response} from 'express';

import pool from '../database';

class ClientsController {
  public async list(req: Request, res: Response) {
    try {
      const clients = await pool.query('SELECT * FROM clients JOIN credit ON clients.id_client = credit.id_Client');
      res.json(clients);
    } catch (error) {
      res.json({ text: "Ha ocurrido el siguiente error: " + error });
    }
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const client = await pool.query(
        'SELECT * FROM clients JOIN credit ON clients.id_client = credit.id_Client WHERE clients.id_client = ?',
        [id]
      );
      if (client.length > 0) {
        return res.json(client[0]);
      }
      res.status(404).json({ text: "El cliente no existe" });
    } catch (error) {
      res.json(error);
    }
  }


  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query('INSERT INTO clients set ?', [req.body]);
      res.json({ message: 'Se ha guardado al cliente correctamnete ' });
    } catch (error) {
      res.json({ text: "Ha ocurrido el siguiente error: " + error });
    }
  }

  public async createwithprocedure(req: Request, res: Response): Promise<void> {
    try {
      const { nameClient, lastName, dni, phone, email, creditAvailable } = req.body;
      const query = `
        SET @nameClient = ?;
        SET @lastName = ?;
        SET @dni = ?;
        SET @phone = ?;
        SET @email = ?;
        SET @creditAvailable = ?;

        CALL sp_saveClientWithCredit(@nameClient, @lastName, @dni, @phone,
                      @email, @creditAvailable);
      `;
      await pool.query(query, [nameClient, lastName, dni, phone, email, creditAvailable]);
      res.json({ message: 'Se ha guardo al cliente correctamente' });
    } catch (error) {
      res.json({ text: "Ha ocurrido el siguiente error: " + error });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const query = `
        SET @id_client = ?;
        CALL sp_deleteClient(@id_client);
      `;
      await pool.query(query, [id]);
      res.json({ message: "Se ha eliminado al cliente correctamente" });
    } catch (error) {
      res.json({ text: "Ha ocurrido el siguiente error: " + error });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const client = await pool.query('UPDATE clients JOIN credit ON clients.id_client = credit.id_Client  set ? WHERE credit.id_client = ?', [req.body, id]);
      res.json({ message: 'Se ha actualizado el cliente correctamnete ' });

    } catch (error) {
      res.json({ text: "Ha ocurrido el siguiente error: " + error });
    }
  }
}

const clientsController = new ClientsController();

export default clientsController;