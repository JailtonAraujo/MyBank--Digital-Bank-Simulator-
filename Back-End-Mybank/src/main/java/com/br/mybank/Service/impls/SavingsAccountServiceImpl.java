package com.br.mybank.Service.impls;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Random;
import java.util.ArrayList;
import java.util.List;

import com.br.mybank.Model.Operations.TransferOperation;
import com.br.mybank.Repository.TransferRepository;
import com.br.mybank.Service.AccountGenericServices;
import com.br.mybank.exception.UnsupportedMathOperationException;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.br.mybank.DTO.AccountReportDTO;
import com.br.mybank.DTO.ObjectPaginationOperationsAccount;
import com.br.mybank.DTO.WithdrawDTO;
import com.br.mybank.Model.Account;
import com.br.mybank.Model.SavingsAccount;
import com.br.mybank.Model.Operations.WithdrawMoneyOperation;
import com.br.mybank.Repository.SavingsAccountRepository;
import com.br.mybank.Repository.WithdrawRepository;
import com.br.mybank.Service.ReportUtil;
import com.br.mybank.Service.SavingsAccountService;

import net.sf.jasperreports.engine.JRException;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SavingsAccountServiceImpl implements SavingsAccountService {


	@Autowired
	protected SavingsAccountRepository savingsAccountRepository;
	
	@Autowired
	protected WithdrawRepository withdrawRepository;

	@Autowired
	protected TransferRepository  transferRepository;

	@Autowired
	protected ReportUtil reportUtil;

	@Autowired
	protected AccountGenericServices accountGenericServices;


	@Override
	public SavingsAccount generateNewAccount() {

		//Receiving an account model generated and validated
		Account account = accountGenericServices.generatedModelAccount();

		// build a model savings account
		SavingsAccount savingsAccount = new SavingsAccount().builder().taxaJuros_per_month((float) 0.5).saldo(1000.0)
				.build();
		savingsAccount.setAgencia(account.getAgencia());
		savingsAccount.setConta(account.getConta());
		savingsAccount.setDigito(account.getDigito());
		savingsAccount.setDataAbertura(account.getDataAbertura());

		return savingsAccount;
	}


	@Override
	@Transactional(rollbackFor = {Exception.class, SQLException.class})
	public WithdrawMoneyOperation whithdrawMoney(WithdrawMoneyOperation withdrawMoneyOperation) throws Exception  {
		
		Double currentSaldo = findSaldoByAccountId(withdrawMoneyOperation.getAccount().getId());
		
		
		//Verify if account balance is enough for complete the withdraw// 
		if(currentSaldo < withdrawMoneyOperation.getValue() ) {
			throw new UnsupportedMathOperationException("Unable to complete action, Insufficient balance!");

		}else {
			savingsAccountRepository.updateAccountSaldo((currentSaldo - withdrawMoneyOperation.getValue()), withdrawMoneyOperation.getAccount().getId());
			withdrawMoneyOperation.setDate(LocalDate.now());
			return withdrawRepository.save(withdrawMoneyOperation);
		}
		
	}

	@Override
	@Transactional(rollbackFor = {Exception.class, SQLException.class})
	public TransferOperation transfer(TransferOperation transferOperation) {

		Double currentOriginAccountSaldo = findSaldoByAccountId(transferOperation.getAccountOrigem().getId());

		if(currentOriginAccountSaldo < transferOperation.getValue()){
			throw new UnsupportedMathOperationException("Unable to complete action, Insufficient balance!");
		}else{

			Double currentDestinyAccountSaldo = findSaldoByAccountId(transferOperation.getAccountDestino().getId());

			//Updating origin account balance
			savingsAccountRepository.updateAccountSaldo((currentOriginAccountSaldo - transferOperation.getValue()),transferOperation.getAccountOrigem().getId());

			//Updating destiny account balance
			savingsAccountRepository.updateAccountSaldo((currentOriginAccountSaldo + transferOperation.getValue()),transferOperation.getAccountDestino().getId());

			transferOperation.setDate(LocalDate.now());

			//Saving transfer operation and returning
			return transferRepository.save(transferOperation);

		}

	}


	@Override
	public Double findSaldoByAccountId(Long accountId) {
	
		return savingsAccountRepository.findSaldoByAccountId(accountId);
	}

	@Override
	public Boolean verifyIfExistsAccount(Account account) {
		return accountGenericServices.verifyIfExistsAccount(account);
	}

	
	
	/*No implementation*/
	
	@Override
	public Account generatedModelAccount() {
		// TODO Auto-generated method stub
		return null;
	}

}
