"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const creditController_1 = __importDefault(require("../controllers/creditController"));
class ClientsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', creditController_1.default.list);
        this.router.get('/getCreditClient/:id', creditController_1.default.getCreditClient);
        this.router.post('/', creditController_1.default.create);
        this.router.put('/:id', creditController_1.default.update);
        this.router.delete('/:id', creditController_1.default.delete);
    }
}
const clientsRoutes = new ClientsRoutes();
exports.default = clientsRoutes.router;
