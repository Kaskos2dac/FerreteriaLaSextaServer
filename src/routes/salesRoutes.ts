import { Router } from 'express';
import salesController from '../controllers/salesController';

class SalesRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get('/getTotalSalesAll', salesController.getTotalSales);
    this.router.get('/getTotalAllSalesWithCredit', salesController.getTotalAllSalesWithCredit);
    this.router.get('/getTotalAllSalesWithoutCredit', salesController.getTotalAllSalesWithoutCredit);
    this.router.get('/allSales', salesController.list);
    this.router.get('/allSalesForGraphic', salesController.listSalesForGraphic);
    this.router.get('/listSalesWithClientHadCredit', salesController.listSalesWithClientHadCredit);
    this.router.get('/:id', salesController.getOne);
    this.router.get('/getTotalForDay/:id', salesController.getTotalSaleForDay);
    this.router.get('/getTotalSaleForDayWitchCredit/:id', salesController.getTotalSaleForDayWitchCredit);
    this.router.get('/today/:id', salesController.getToday);
    this.router.get('/detailSale/:id', salesController.getDetailSaleWitchId);
    this.router.get("/getOne/:id", salesController.getOne);
    this.router.get("/getOneSaleForBill/:id", salesController.getOneSaleForBill);
    this.router.post('/SaleAdd', salesController.createwithprocedure);
    this.router.put('/:id', salesController.update);
    this.router.delete('/:id', salesController.delete);
  }
}

const salesRoutes = new SalesRoutes();

export default salesRoutes.router;
