package com.br.mybank.Service.impls;

import java.time.LocalDate;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.mybank.Model.Account;
import com.br.mybank.Model.SavingsAccount;
import com.br.mybank.Model.Operations.WithdrawMoneyOperation;
import com.br.mybank.Repository.SavingsAccountRepository;
import com.br.mybank.Repository.WithdrawRepository;
import com.br.mybank.Service.SavingsAccountService;

@Service
public class SavingsAccountServiceImpl implements SavingsAccountService {


	@Autowired
	protected SavingsAccountRepository savingsAccountRepository;
	
	@Autowired
	protected WithdrawRepository withdrawRepository;
	
	Random random = new Random();

	@Override
	public SavingsAccount generateNewAccount() {

		Account account;

		while (true) {

			account = generatedModelAccount();// receive a model of generic account

			// verify if already exists a account with theses informations in database//
			if (savingsAccountRepository.verifyIfExistsAccount(account.getAgencia(), account.getConta(),
					account.getDigito()) == false) {
				break;
			}
		}

		// build a model savings account
		SavingsAccount savingsAccount = new SavingsAccount().builder().saldo(1000.00).taxaJuros_per_month((float) 0.5)
				.build();
		savingsAccount.setAgencia(account.getAgencia());
		savingsAccount.setConta(account.getConta());
		savingsAccount.setDigito(account.getDigito());
		savingsAccount.setDataAbertura(account.getDataAbertura());

		return savingsAccount;
	}

	@Override
	public Account generatedModelAccount() {

		SavingsAccount account = new SavingsAccount();
		account.setAgencia(1308);

		account.setConta(random.nextInt(9999999));

		account.setDigito(random.nextInt(9));

		account.setDataAbertura(LocalDate.now());

		return account;
	}

	@Override
	public void whithdrawMoney(WithdrawMoneyOperation withdrawMoneyOperation) throws Exception  {
		
		Double currentSaldo = findSaldoByAccountId(withdrawMoneyOperation.getAccountId());
		
		
		//Verify if account balance is enough for complete the withdraw// 
		if(currentSaldo < withdrawMoneyOperation.getValue() ) {
			throw new Exception("Unable to complete action, Insufficient balance!");

		}else {
			savingsAccountRepository.withDrawMoney((currentSaldo - withdrawMoneyOperation.getValue()), withdrawMoneyOperation.getAccountId());
			withdrawMoneyOperation.setDate(LocalDate.now());
			withdrawRepository.save(withdrawMoneyOperation);
		}
		
	}
	
	

	@Override
	public Double findSaldoByAccountId(Long accountId) {
	
		return savingsAccountRepository.findSaldoByAccountId(accountId);
	}
	
	//TO DO//
	 /*
	  * Generated withdraw certificate in PDF
	   */

}
