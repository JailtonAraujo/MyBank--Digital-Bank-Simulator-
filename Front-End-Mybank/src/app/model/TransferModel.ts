import { Account } from "./Account"

export class TranferModel{
    id?:number
    accountDestino!:Account;
    accountOrigem!:Account;
    value!:number;
    date?:Date;
}