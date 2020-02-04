import { Router } from 'express';
import  productsController from '../controllers/productsController';

class ProductsRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get('/', productsController.list);
    this.router.get('/productsStock/', productsController.listWithStock);
    this.router.get('/:id', productsController.getOne);
    this.router.get('/stockProduct/:id', productsController.getStockOneProduct);
    this.router.post('/', productsController.create);
    this.router.put('/:id', productsController.update);
    this.router.delete('/:id', productsController.delete);
  }
}

const productsRoutes = new ProductsRoutes();

export default productsRoutes.router;
