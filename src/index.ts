import express, {Application} from 'express';
import indexRoutes from './routes/indexRoutes';
import productsRoutes from './routes/productsRoutes';
import clientsRoutes from './routes/clientsRoutes';
import usersRoutes from './routes/usersRoutes';
import salesRoutes from './routes/salesRoutes';
import detailSaleRoutes from './routes/detailSaleRoutes';
import morgan from 'morgan';
import cors from 'cors';
import creditRoutes from './routes/creditRoutes';

class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }


    config():void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }

    routes():void {
        this.app.use(indexRoutes);
        this.app.use('/api/products',productsRoutes);
        this.app.use('/api/clients',clientsRoutes);
        this.app.use('/api/users',usersRoutes);
        this.app.use('/api/sales', salesRoutes);
        this.app.use('/api/detailSale', detailSaleRoutes);
        this.app.use('/api/credit', creditRoutes);
    }

    start():void {

        this.app.listen( this.app.get('port'), () => {
            // tslint:disable-next-line: no-console
            console.log('server on port ' + this.app.get('port'));
        })
    }
}

const server = new Server();

server.start();