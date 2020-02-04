"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detailSaleController_1 = __importDefault(require("../controllers/detailSaleController"));
class DetailSaleRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/lastID', detailSaleController_1.default.getLastID);
        this.router.post('/addDetailSale', detailSaleController_1.default.createwithprocedure);
        this.router.get("/:id", detailSaleController_1.default.getOne);
        this.router.get("/getOneForBill/:id", detailSaleController_1.default.getOneForBill);
        this.router.post("/", detailSaleController_1.default.create);
        this.router.put("/:id", detailSaleController_1.default.update);
        this.router.delete("/:id", detailSaleController_1.default.delete);
    }
}
const detailSaleRoutes = new DetailSaleRoutes();
exports.default = detailSaleRoutes.router;
