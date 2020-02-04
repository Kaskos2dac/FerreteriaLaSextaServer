"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const salesController_1 = __importDefault(require("../controllers/salesController"));
class SalesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/getTotalSalesAll', salesController_1.default.getTotalSales);
        this.router.get('/getTotalAllSalesWithCredit', salesController_1.default.getTotalAllSalesWithCredit);
        this.router.get('/getTotalAllSalesWithoutCredit', salesController_1.default.getTotalAllSalesWithoutCredit);
        this.router.get('/allSales', salesController_1.default.list);
        this.router.get('/allSalesForGraphic', salesController_1.default.listSalesForGraphic);
        this.router.get('/listSalesWithClientHadCredit', salesController_1.default.listSalesWithClientHadCredit);
        this.router.get('/:id', salesController_1.default.getOne);
        this.router.get('/getTotalForDay/:id', salesController_1.default.getTotalSaleForDay);
        this.router.get('/getTotalSaleForDayWitchCredit/:id', salesController_1.default.getTotalSaleForDayWitchCredit);
        this.router.get('/today/:id', salesController_1.default.getToday);
        this.router.get('/detailSale/:id', salesController_1.default.getDetailSaleWitchId);
        this.router.get("/getOne/:id", salesController_1.default.getOne);
        this.router.get("/getOneSaleForBill/:id", salesController_1.default.getOneSaleForBill);
        this.router.post('/SaleAdd', salesController_1.default.createwithprocedure);
        this.router.put('/:id', salesController_1.default.update);
        this.router.delete('/:id', salesController_1.default.delete);
    }
}
const salesRoutes = new SalesRoutes();
exports.default = salesRoutes.router;
