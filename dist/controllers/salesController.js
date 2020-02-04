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
class SalesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield database_1.default.query(`SELECT sales.id_Sale, sales.id_client, sales.datesale, sales.totalProducts, sales.credit, sales.totalPrice, 
clients.nameClient, clients.lastName
FROM sales 
INNER JOIN clients ON sales.id_client = clients.id_client 
ORDER BY ( sales.id_Sale) DESC`);
                res.json(sales);
                console.log(sales);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    getTotalSales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield database_1.default.query(`SELECT SUM(totalPrice) as total FROM sales`);
                if (sales.length > 0) {
                    return res.json(sales);
                }
                res.status(404).json({ text: "the sale doesn't exists" });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    getTotalAllSalesWithCredit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield database_1.default.query(`SELECT SUM(totalPrice) as total FROM sales WHERE credit = 'Si' AND creditState = 'Abierta'`);
                if (sales.length > 0) {
                    return res.json(sales);
                }
                res.status(404).json({ text: "the sale doesn't exists" });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    getTotalAllSalesWithoutCredit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield database_1.default.query(`SELECT SUM(totalPrice) as total FROM sales WHERE credit = 'No' AND creditState = 'Cerrada';`);
                if (sales.length > 0) {
                    return res.json(sales);
                }
                res.status(404).json({ text: "the sale doesn't exists" });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    getTotalSaleForDay(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log(id);
                const sales = yield database_1.default.query('SELECT SUM(totalPrice) as total FROM sales WHERE dateSale = ?', [id]);
                if (sales.length > 0) {
                    return res.json(sales);
                }
                res.status(404).json({ text: "the detailSale doesn't exists" });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    getTotalSaleForDayWitchCredit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log(id);
                const sales = yield database_1.default.query(`SELECT SUM(totalPrice) as total FROM sales WHERE credit = 'Si' AND creditState = 'Abierta' AND dateSale = ?`, [id]);
                if (sales.length > 0) {
                    return res.json(sales);
                }
                res.status(404).json({ text: "the detailSale doesn't exists" });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    listSalesForGraphic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield database_1.default.query(`SELECT count(id_Sale) as cantidadventas, sum(totalPrice) as totalventas, id_Sale, totalPrice, dateSale FROM sales
group by (sales.dateSale)
ORDER BY ( sales.id_Sale) DESC`);
                res.json(sales);
                console.log(sales);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    listSalesWithClientHadCredit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield database_1.default.query(`SELECT clients.nameClient, clients.lastName, sales.dateSale, sales.id_Sale, sales.creditState, sales.credit, sales.totalPrice
      FROM clients INNER JOIN Sales ON sales.id_Client = clients.id_client
      WHERE sales.credit = 'Si' AND sales.creditState = 'Abierta'`);
                res.json(sales);
                console.log(sales);
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
                const sale = yield database_1.default.query('SELECT * FROM sales WHERE id_Sale = ?', [id]);
                if (sale.length > 0) {
                    return res.json(sale[0]);
                }
                res.status(404).json({ text: "the sale doesn't exists" });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    getOneSaleForBill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const sale = yield database_1.default.query(`SELECT sales.id_Sale, sales.id_client, sales.datesale, sales.totalProducts, sales.credit, sales.totalPrice, 
      clients.nameClient, clients.lastName, clients.dni, clients.phone
      FROM sales 
      INNER JOIN clients ON sales.id_client = clients.id_client 
      WHERE sales.id_Sale = ?`, [id]);
                if (sale.length > 0) {
                    return res.json(sale[0]);
                }
                res.status(404).json({ text: "the sale doesn't exists" });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    getDetailSaleWitchId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log(req.params);
                const sale = yield database_1.default.query(`SELECT detailsale.precio, detailsale.cantidad, products.title, sales.credit
FROM detailsale
INNER JOIN sales ON sales.id_sale = detailsale.id_Sale
INNER JOIN products ON products.id_product = detailsale.id_product
WHERE detailsale.id_Sale = ?`, [id]);
                if (sale.length > 0) {
                    return res.json(sale);
                }
                res.status(404).json({ text: "the detailSale doesn't exists" });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    getToday(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log(req.params);
                const sale = yield database_1.default.query(`SELECT sales.id_Sale, sales.id_client, sales.datesale, sales.totalProducts, sales.credit, sales.totalPrice, 
clients.nameClient, clients.lastName,
detailsale.id_product,detailsale.precio,
products.title
FROM sales 
INNER JOIN clients ON sales.id_client = clients.id_client  JOIN detailsale ON detailsale.id_Sale = sales.id_sale
JOIN products ON detailsale.id_product = products.id_product
WHERE sales.datesale = ?`, [id]);
                if (sale.length > 0) {
                    return res.json(sale);
                }
                res.status(404).json({ text: "the sale doesn't exists" });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    createwithprocedure(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { id_Client, dateSale, totalProducts, credit, totalPrice, creditState } = req.body;
                const query = `
        SET @id_Client = ?;
        SET @dateSale = ?;
        SET @totalProducts = ?;
        SET @credit = ?;
        SET @creditState = ?;
        SET @totalPrice = ?;
        CALL sp_Sale( @id_Client, @dateSale, @totalProducts, @credit, @creditState, @totalPrice);`;
                yield database_1.default.query(query, [id_Client, dateSale, totalProducts, credit, creditState, totalPrice]);
                res.json({ message: 'save sale ' });
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO sales set ?', [req.body]);
            res.json({ message: 'save sale ' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const sale = yield database_1.default.query('DELETE FROM sales WHERE id_Sale = ?', [id]);
            res.json({ text: 'the sale was deleted ' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log(id);
                const sale = yield database_1.default.query(`UPDATE sales SET credit = 'No', creditState = 'Cerrada' WHERE id_Sale = ?`, [req.body.id_Sale, id]);
                res.json({ text: "the sale was updating " });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
}
const salesController = new SalesController();
exports.default = salesController;
