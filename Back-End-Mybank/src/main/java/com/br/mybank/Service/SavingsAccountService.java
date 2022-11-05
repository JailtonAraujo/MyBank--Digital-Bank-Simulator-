package com.br.mybank.Service;

import com.br.mybank.Model.Account;
import com.br.mybank.Model.SavingsAccount;
import com.br.mybank.Model.Operations.WithdrawMoneyOperation;

public interface SavingsAccountService {

	//generated a valid model savings account
	public SavingsAccount generateNewAccount();
	
	public Account generatedModelAccount();
	
	public WithdrawMoneyOperation whithdrawMoney(WithdrawMoneyOperation withdrawMoneyOperation) throws Exception;
	
	public Double findSaldoByAccountId(Long accountId);
	
	//Generate certificate of account created
	public String generateSavingsAccountCertificate(Long accountId);
	
	public Boolean verifyIfExistsAccount(Account account);
}
