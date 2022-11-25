import { Account } from "./Account";
import { AddressModel } from "./Address";

export interface PhysicalPerson{
    id?:number,
    name:string,
    lastname:string,
    cpf:string,
    password:string,
    address?:AddressModel,
    account?:Account,
}