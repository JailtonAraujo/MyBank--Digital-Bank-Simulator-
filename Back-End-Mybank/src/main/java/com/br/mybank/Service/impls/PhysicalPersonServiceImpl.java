package com.br.mybank.Service.impls;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.mybank.Model.PhysicalPerson;
import com.br.mybank.Repository.PhysicalPersonRepository;
import com.br.mybank.Service.PhysicalPersonService;
import com.br.mybank.Service.SavingsAccountService;

@Service
public class PhysicalPersonServiceImpl implements PhysicalPersonService{
	
	@Autowired
	protected PhysicalPersonRepository physicalPersonRepository;
	
	@Autowired
	protected SavingsAccountService savingsAccountService;


	@Override
	public PhysicalPerson registerNewPerson(PhysicalPerson physicalPerson) {
		
		physicalPerson.setAccount(savingsAccountService.generateNewAccount());
		physicalPerson.getAccount().setPerson(physicalPerson);
		
		return physicalPersonRepository.save(physicalPerson);
	}

	@Override
	public Boolean verifyIfExistsCpf(String cpf) {
		
		if(physicalPersonRepository.verifyIfExistsCpf(cpf)) {
			return true;//if already exists CPF return true//
		}else {
			return false;// if not exists CPF return false//
		}

	}
	
	

}
