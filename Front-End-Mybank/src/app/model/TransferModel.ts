import { Account } from "./Account"

export class TranferModel{
    id?:number
    destino!:Account;
    origem!:Account;
    value!:number;
    date?:Date;
}