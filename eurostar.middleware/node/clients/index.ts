import { IOClients } from '@vtex/api'


import Cart from './cart';
import Files from './files';
import MasterDataExternal from './masterDataExternal';
import VTEXOrders from './order';
import VTEXSpecificationSeller from './specificationSeller';
import User from './user';

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {

    public get cart() {
        return this.getOrSet('cart', Cart);
    }
    
    public get user() {
        return this.getOrSet('user', User);
    }
    
    public get masterdataExternal() {
        return this.getOrSet('masterdataExternal', MasterDataExternal);
    }

    public get orderClient() {
        return this.getOrSet('vtexOrder', VTEXOrders)
    }
    
    public get specification() {
        return this.getOrSet("specificationSeller" , VTEXSpecificationSeller)
    }

    public get file() {
        return this.getOrSet('file', Files);
    }
}
