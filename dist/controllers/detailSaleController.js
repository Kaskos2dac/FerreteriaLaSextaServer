"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class DetailSaleController {
    getLastID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = yield database_1.default.query('SELECT max(id_Sale) FROM sales');
                res.json(id);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    createwithprocedure(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_product, id_Sale, id_Client, numberProducts, priceProduct } = req.body;
                const query = `
        SET @id_product = ?;
        SET @id_Sale = ?;
        SET @id_Client = ?;
        SET @numberProducts = ?;
        SET @priceProduct = ?;

        CALL sp_Detailsale(@id_product, @id_Sale, @id_Client,
                      @numberProducts, @priceProduct);
      `;
                yield database_1.default.query(query, [id_product, id_Sale, id_Client, numberProducts, priceProduct]);
                res.status(200).json({ message: 'save Detailsale ' });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield database_1.default.query('SELECT * FROM clients');
                res.json(clients);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const client = yield database_1.default.query('SELECT * FROM clients WHERE id_client = ?', [id]);
                if (client.length > 0) {
                    return res.json(client[0]);
                }
                res.status(404).json({ text: "the saleDetail doesn't exists" });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    getOneForBill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const detailSale = yield database_1.default.query(`SELECT detailsale.id_product, detailsale.cantidad, products.title, products.price
FROM detailsale
INNER JOIN products ON products.id_product = detailsale.id_product
WHERE detailsale.id_Sale = ?`, [id]);
                if (detailSale.length > 0) {
                    return res.json(detailSale);
                }
                res.status(404).json({ text: "the saleDetail doesn't exists" });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('INSERT INTO clients set ?', [req.body]);
                res.json({ message: 'save client ' });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const client = yield database_1.default.query('DELETE FROM clients WHERE id_client = ?', [id]);
            res.json({ text: "the saleDetail was deleted " });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const client = yield database_1.default.query('UPDATE clients set ? WHERE id_client = ?', [req.body, id]);
            res.json({ message: "the saleDetail was updating " });
        });
    }
}
const detailSaleController = new DetailSaleController();
exports.default = detailSaleController;
