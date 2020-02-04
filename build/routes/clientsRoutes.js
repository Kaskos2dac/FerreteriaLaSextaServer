"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientsController_1 = __importDefault(require("../controllers/clientsController"));
class ClientsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', clientsController_1.default.list);
        this.router.get('/:id', clientsController_1.default.getOne);
        this.router.post('/', clientsController_1.default.createwithprocedure);
        this.router.put('/:id', clientsController_1.default.update);
        this.router.delete('/:id', clientsController_1.default.delete);
    }
}
const clientsRoutes = new ClientsRoutes();
exports.default = clientsRoutes.router;
