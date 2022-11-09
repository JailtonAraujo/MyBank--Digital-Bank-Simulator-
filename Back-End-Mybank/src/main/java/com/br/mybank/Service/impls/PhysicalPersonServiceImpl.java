package com.br.mybank.Service.impls;

import com.br.mybank.DTO.PhysicalPersonDTO;
import com.br.mybank.Repository.PhysicalPersonCustomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.mybank.Model.PhysicalPerson;
import com.br.mybank.Repository.PhysicalPersonRepository;
import com.br.mybank.Service.PhysicalPersonService;
import com.br.mybank.Service.SavingsAccountService;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class PhysicalPersonServiceImpl implements PhysicalPersonService{
	
	@Autowired
	protected PhysicalPersonRepository physicalPersonRepository;
	
	@Autowired
	protected SavingsAccountService savingsAccountService;

	@Autowired
	protected PhysicalPersonCustomRepository personCustomRepository;


	@Override
	@Transactional
	public PhysicalPerson registerNewPerson(PhysicalPerson physicalPerson) {
		
		physicalPerson.setAccount(savingsAccountService.generateNewAccount());
		physicalPerson.getAccount().setPerson(physicalPerson);
		
		return physicalPersonRepository.save(physicalPerson);
	}

	@Override
	public List<PhysicalPersonDTO> findByName(String name) {

		return personCustomRepository.findByName(name);
	}

	@Override
	public Optional<PhysicalPerson> findById(Long personId) {
		return physicalPersonRepository.findById(personId);
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
