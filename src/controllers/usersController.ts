import { Request, Response} from 'express';

import pool from '../database';

class UsersController {

  public async list(req: Request, res: Response) {
    try {
      const clients = await pool.query('SELECT * FROM users');
      res.json(clients);
    } catch (error) {
      res.json(error);
    }
  };

  public async getOne(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const user = await pool.query('SELECT * FROM users WHERE id_User = ?', [id]);
            if (user.length > 0) {
                return res.json(user[0]);
            }
            res.status(404).json({text: "the user doesn't exists"});
        } catch (error) {
            res.json(error);
        }
  };

  public async create(req: Request, res: Response): Promise<void> {
    await pool.query('INSERT INTO users set ?', [req.body]);
    res.json({ message: 'save user '});
  };

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await pool.query('DELETE FROM users WHERE id_User = ?', [id]);
    res.json({ text: 'the user was deleted '});
  };

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await pool.query('UPDATE users set ? WHERE id_User = ?', [req.body, id]);
    res.json({ message: 'the user was updating '});
  }
}

const usersController = new UsersController();

export default usersController;