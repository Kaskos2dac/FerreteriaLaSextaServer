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
class ClientsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield database_1.default.query('SELECT * FROM clients JOIN credit ON clients.id_client = credit.id_Client');
                res.json(clients);
            }
            catch (error) {
                res.json({ text: "Ha ocurrido el siguiente error: " + error });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const client = yield database_1.default.query('SELECT * FROM clients JOIN credit ON clients.id_client = credit.id_Client WHERE clients.id_client = ?', [id]);
                if (client.length > 0) {
                    return res.json(client[0]);
                }
                res.status(404).json({ text: "El cliente no existe" });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                yield database_1.default.query('INSERT INTO clients set ?', [req.body]);
                res.json({ message: 'Se ha guardado al cliente correctamnete ' });
            }
            catch (error) {
                res.json({ text: "Ha ocurrido el siguiente error: " + error });
            }
        });
    }
    createwithprocedure(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { nameClient, lastName, dni, phone, email, creditAvailable } = req.body;
                const query = `
        SET @nameClient = ?;
        SET @lastName = ?;
        SET @dni = ?;
        SET @phone = ?;
        SET @email = ?;
        SET @creditAvailable = ?;
      
        CALL sp_saveClientWithCredit(@nameClient, @lastName, @dni, @phone,
                      @email, @creditAvailable);
      `;
                yield database_1.default.query(query, [nameClient, lastName, dni, phone, email, creditAvailable]);
                res.json({ message: 'Se ha guardo al cliente correctamente' });
            }
            catch (error) {
                res.json({ text: "Ha ocurrido el siguiente error: " + error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const query = `
        SET @id_client = ?;
        CALL sp_deleteClient(@id_client);
      `;
                yield database_1.default.query(query, [id]);
                res.json({ message: "Se ha eliminado al cliente correctamente" });
            }
            catch (error) {
                res.json({ text: "Ha ocurrido el siguiente error: " + error });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const client = yield database_1.default.query('UPDATE clients JOIN credit ON clients.id_client = credit.id_Client  set ? WHERE credit.id_client = ?', [req.body, id]);
                res.json({ message: 'Se ha actualizado el cliente correctamnete ' });
            }
            catch (error) {
                res.json({ text: "Ha ocurrido el siguiente error: " + error });
            }
        });
    }
}
const clientsController = new ClientsController();
exports.default = clientsController;
