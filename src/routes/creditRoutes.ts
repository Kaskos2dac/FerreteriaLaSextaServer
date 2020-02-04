import { Router } from 'express';
import creditController from '../controllers/creditController';

class ClientsRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get('/', creditController.list);
    this.router.get('/getCreditClient/:id', creditController.getCreditClient);
    this.router.post('/', creditController.create);
    this.router.put('/:id', creditController.update);
    this.router.delete('/:id', creditController.delete);
  }
}

const clientsRoutes = new ClientsRoutes();

export default clientsRoutes.router;
