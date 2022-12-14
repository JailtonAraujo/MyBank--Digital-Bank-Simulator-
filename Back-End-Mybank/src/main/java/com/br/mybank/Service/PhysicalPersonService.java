package com.br.mybank.Service;

import com.br.mybank.DTO.AuthDTO;
import com.br.mybank.DTO.PhysicalPersonDTO;
import com.br.mybank.Model.Account;
import com.br.mybank.Model.PhysicalPerson;

import java.util.List;
import java.util.Optional;

public interface PhysicalPersonService {
	
	//verify if already exists CPF registered in DataBase// 
	public Boolean verifyIfExistsCpf (String cpf);
	
	//Register new physical person with account in DataBase//
	public AuthDTO registerNewPerson(PhysicalPerson physicalPerson);
	
	public List<PhysicalPersonDTO> findByName(String name);
	
	public Optional<PhysicalPerson> findById(Long personId);
	
	public Optional<PhysicalPersonDTO> findByAccount(Account account) throws Exception;
	
	

}
