package com.br.mybank.Service;

import com.br.mybank.Model.PhysicalPerson;

public interface PhysicalPersonService {
	
	//verify if already exists CPF registered in DataBase// 
	public Boolean verifyIfExistsCpf (String cpf);
	
	//Register new physical person with account in DataBase//
	public PhysicalPerson registerNewPerson(PhysicalPerson physicalPerson);
	
	

}
