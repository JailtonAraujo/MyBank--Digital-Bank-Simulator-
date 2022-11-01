import { AddressModel } from "./Address";

export interface PhysicalPerson{
    id?:number,
    name:string,
    lastname:string,
    cpf:string,
    addressClass?:AddressModel
}