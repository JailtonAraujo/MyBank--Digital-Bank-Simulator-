package com.br.mybank.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.mybank.Model.SavingsAccount;
import com.br.mybank.Model.Operations.WithdrawMoneyOperation;
import com.br.mybank.Service.SavingsAccountService;

@RestController
@RequestMapping("/savings-account")
public class SavingsAccountController {
	
	@Autowired
	protected SavingsAccountService savingsAccountService;
	
	@PostMapping("/withdraw-money")
	public ResponseEntity<SavingsAccount> whithdrawMoney (@RequestBody WithdrawMoneyOperation withdrawMoneyOperation) throws Exception {
	
		this.savingsAccountService.whithdrawMoney(withdrawMoneyOperation);
		
		return new ResponseEntity<SavingsAccount>(HttpStatus.OK);
		
	}
	
	@GetMapping(value="/certificate-creted/{id}",produces = "application/text")
	public ResponseEntity<String> generateSavingAccountCertificate( @PathVariable(name = "id") Long accountId ){
		
		return ResponseEntity.ok(this.savingsAccountService.generateSavingsAccountCertificate(accountId));
		
	}
	
}
