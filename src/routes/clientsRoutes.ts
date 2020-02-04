import { Router } from 'express';
import  clientsController from '../controllers/clientsController';

class ClientsRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get('/', clientsController.list);
    this.router.get('/:id', clientsController.getOne);
    this.router.post('/', clientsController.createwithprocedure);
    this.router.put('/:id', clientsController.update);
    this.router.delete('/:id', clientsController.delete);
  }
}

const clientsRoutes = new ClientsRoutes();

export default clientsRoutes.router;
