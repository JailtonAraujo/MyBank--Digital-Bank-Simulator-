package com.br.mybank;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.br.mybank.Model.PhysicalPerson;
import com.br.mybank.Model.SavingsAccount;
import com.br.mybank.Repository.PhysicalPersonRepository;
import com.br.mybank.Service.PhysicalPersonService;
import com.br.mybank.Service.SavingsAccountService;

@SpringBootTest
class BackEndMybankApplicationTests {

	@Autowired
	SavingsAccountService accountService;
	
	@Autowired
	PhysicalPersonService personService;
	
	@Test
	void tsnad() {
		
		SavingsAccount account = accountService.generateNewAccount();
		
		System.out.println(account);
		
	}
	
	@Test
	void testGenrated () {
		
		personService.registerNewPerson(new PhysicalPerson());
		
	}

}
