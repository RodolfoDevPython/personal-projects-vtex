import { IOClients } from '@vtex/api'
import MessageCenterClient from './messageCenterClient';

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get messageCenterClient() {
    return this.getOrSet('messageCenterClient', MessageCenterClient)
  }
}
