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
class UsersController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield database_1.default.query('SELECT * FROM users');
                res.json(clients);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    ;
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield database_1.default.query('SELECT * FROM users WHERE id_User = ?', [id]);
                if (user.length > 0) {
                    return res.json(user[0]);
                }
                res.status(404).json({ text: "the user doesn't exists" });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    ;
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO users set ?', [req.body]);
            res.json({ message: 'save user ' });
        });
    }
    ;
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield database_1.default.query('DELETE FROM users WHERE id_User = ?', [id]);
            res.json({ text: 'the user was deleted ' });
        });
    }
    ;
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield database_1.default.query('UPDATE users set ? WHERE id_User = ?', [req.body, id]);
            res.json({ message: 'the user was updating ' });
        });
    }
}
const usersController = new UsersController();
exports.default = usersController;
