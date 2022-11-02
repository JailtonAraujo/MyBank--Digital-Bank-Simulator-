package com.br.mybank;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.br.mybank.DTO.AccountDTO;
import com.br.mybank.DTO.AccountReportDTO;
import com.br.mybank.Model.PhysicalPerson;
import com.br.mybank.Model.SavingsAccount;
import com.br.mybank.Model.Operations.WithdrawMoneyOperation;
import com.br.mybank.Repository.PhysicalPersonRepository;
import com.br.mybank.Repository.SavingsAccountRepository;
import com.br.mybank.Service.PhysicalPersonService;
import com.br.mybank.Service.SavingsAccountService;

@SpringBootTest
class BackEndMybankApplicationTests {

	@Autowired
	SavingsAccountService accountService;
	
	@Autowired
	PhysicalPersonService personService;
	
	@Autowired
	SavingsAccountRepository savingsAccountRepository;
	
	@Test
	void tsnad() {
		
		SavingsAccount account = accountService.generateNewAccount();
		
		System.out.println(account);
		
	}
	
	@Test
	void testGenrated () {
		
		personService.registerNewPerson(new PhysicalPerson());
		
	}
	
	@Test
	void testWithdrawOperation() throws Exception {
		
		WithdrawMoneyOperation moneyOperation = new WithdrawMoneyOperation().builder().accountId(1L).value(2000.00).build();
		
		accountService.whithdrawMoney(moneyOperation);
		
	}
	
	@Test
	void testAccountDTOReport() {
		
		SavingsAccount savingsAccount = savingsAccountRepository.findById(1L).get();
		
		AccountReportDTO dto = new AccountReportDTO(savingsAccount);
		
		System.out.println(dto);
	}

}
