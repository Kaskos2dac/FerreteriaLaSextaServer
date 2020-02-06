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
class CreditController {
    getCreditClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const credit = yield database_1.default.query(`SELECT TotalCredit FROM credit WHERE ${id} = id_Client`);
                res.json(credit);
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
            res.json({ text: 'the client was deleted ' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const client = yield database_1.default.query('UPDATE clients set ? WHERE id_client = ?', [req.body, id]);
            res.json({ message: 'the client was updating ' });
        });
    }
}
const creditController = new CreditController();
exports.default = creditController;
