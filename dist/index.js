"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const productsRoutes_1 = __importDefault(require("./routes/productsRoutes"));
const clientsRoutes_1 = __importDefault(require("./routes/clientsRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const salesRoutes_1 = __importDefault(require("./routes/salesRoutes"));
const detailSaleRoutes_1 = __importDefault(require("./routes/detailSaleRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const creditRoutes_1 = __importDefault(require("./routes/creditRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/products', productsRoutes_1.default);
        this.app.use('/api/clients', clientsRoutes_1.default);
        this.app.use('/api/users', usersRoutes_1.default);
        this.app.use('/api/sales', salesRoutes_1.default);
        this.app.use('/api/detailSale', detailSaleRoutes_1.default);
        this.app.use('/api/credit', creditRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            // tslint:disable-next-line: no-console
            console.log('server on port ' + this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
