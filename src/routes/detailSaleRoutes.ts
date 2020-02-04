import { Router } from 'express';
import detailSaleController from '../controllers/detailSaleController';

class DetailSaleRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get('/lastID', detailSaleController.getLastID);
    this.router.post('/addDetailSale', detailSaleController.createwithprocedure);
    this.router.get("/:id", detailSaleController.getOne);
    this.router.get("/getOneForBill/:id", detailSaleController.getOneForBill);
    this.router.post("/", detailSaleController.create);
    this.router.put("/:id", detailSaleController.update);
    this.router.delete("/:id", detailSaleController.delete);
  }
}

const detailSaleRoutes = new DetailSaleRoutes();

export default detailSaleRoutes.router;
