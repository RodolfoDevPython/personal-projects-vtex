import { IOClients } from '@vtex/api'
import VTEXOrders from './orders';
import VTEXProductRefId from './productRefId';
import TotvsProtheus from './totvsProtheus';


// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {

    public get totvsProtheus() {
        return this.getOrSet('totvsProtheus', TotvsProtheus);
    }

    public get orders() {
        return this.getOrSet('orders', VTEXOrders);
    }

    public get catalogProductRefer() {
        return this.getOrSet('catalogProductRefer', VTEXProductRefId);
    }

}