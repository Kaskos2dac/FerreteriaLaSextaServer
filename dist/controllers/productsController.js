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
class ProductsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield database_1.default.query('SELECT * FROM products ');
                res.json(products);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    listWithStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield database_1.default.query('SELECT * FROM products WHERE stock > 0');
                res.json(products);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    getStockOneProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const Stockproduct = yield database_1.default.query('SELECT stock FROM products WHERE id_product = ?', [id]);
                if (Stockproduct.length > 0) {
                    return res.json(Stockproduct[0]);
                }
                res.status(404).json({ text: "the product doesn't exists" });
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
                const product = yield database_1.default.query('SELECT * FROM products WHERE id_product = ?', [id]);
                if (product.length > 0) {
                    return res.json(product[0]);
                }
                res.status(404).json({ text: "the product doesn't exists" });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO products set ?', [req.body]);
            res.json({ message: 'save product ' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const product = yield database_1.default.query('DELETE FROM products WHERE id_product = ?', [id]);
                res.json({ text: 'the game was deleted ' });
            }
            catch (error) {
                res.json({ text: 'the game not deleted ' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const product = yield database_1.default.query('UPDATE products set ? WHERE id_product = ?', [req.body, id]);
            res.json({ message: 'the game was updating ' });
        });
    }
}
const productsController = new ProductsController();
exports.default = productsController;
