package com.br.mybank.Service;

import com.br.mybank.Model.SavingsAccount;
import com.br.mybank.Model.Operations.TransferOperation;
import com.br.mybank.Model.Operations.WithdrawMoneyOperation;

public interface SavingsAccountService extends AccountGenericServices{

	//generated a valid model savings account
	public SavingsAccount generateNewAccount();
	
	public WithdrawMoneyOperation whithdrawMoney(WithdrawMoneyOperation withdrawMoneyOperation) throws Exception;

	public TransferOperation transfer (TransferOperation transferOperation);
	
	public Double findSaldoByAccountId(Long accountId);
	
	
}
