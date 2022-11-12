package com.br.mybank.Service;

import com.br.mybank.Model.Account;
import com.br.mybank.Model.Operations.TransferOperation;
import com.br.mybank.Model.SavingsAccount;
import com.br.mybank.Model.Operations.WithdrawMoneyOperation;

public interface SavingsAccountService{

	//generated a valid model savings account
	public SavingsAccount generateNewAccount();
	
	public WithdrawMoneyOperation whithdrawMoney(WithdrawMoneyOperation withdrawMoneyOperation) throws Exception;

	public TransferOperation transfer (TransferOperation transferOperation);
	
	public Double findSaldoByAccountId(Long accountId);
	
	//Generate certificate of account created
	public String generateSavingsAccountCertificate(Long accountId);

	//Generate certificate of withdraw operation
	public String generateWithdrawOperationCertificate( Long withdrawId) throws Exception;

	public Boolean verifyIfExistsAccount(Account account);
}
