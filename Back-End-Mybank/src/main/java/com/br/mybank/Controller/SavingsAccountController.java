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

import com.br.mybank.DTO.WithdrawDTO;
import com.br.mybank.Model.SavingsAccount;
import com.br.mybank.Model.Operations.TransferOperation;
import com.br.mybank.Model.Operations.WithdrawMoneyOperation;
import com.br.mybank.Service.SavingsAccountService;

@RestController
@RequestMapping("/savings-account")
public class SavingsAccountController {
	
	@Autowired
	protected SavingsAccountService savingsAccountService;
	
	@PostMapping("/operation/withdraw")
	public ResponseEntity<WithdrawDTO> whithdrawMoney (@RequestBody WithdrawMoneyOperation withdrawMoneyOperation) throws Exception {

		WithdrawMoneyOperation withdrawMoneyOperation1 =this.savingsAccountService.whithdrawMoney(withdrawMoneyOperation);

		WithdrawDTO  dto = new WithdrawDTO(withdrawMoneyOperation1);
		
		return ResponseEntity.ok(dto);
		
	}
	
	@GetMapping(value="/certificate/creted/{id}",produces = "application/text")
	public ResponseEntity<String> generateSavingAccountCertificate( @PathVariable(name = "id") Long accountId ) throws InterruptedException{
		
		return ResponseEntity.ok(this.savingsAccountService.generateSavingsAccountCertificate(accountId));
		
	}

	@PostMapping("/exists")
	public ResponseEntity<Boolean> verifyIfExistsAccount( @RequestBody SavingsAccount account){
		if(this.savingsAccountService.verifyIfExistsAccount(account)) {
			return ResponseEntity.ok(true);
		}
		return new ResponseEntity<Boolean>(false,HttpStatus.NOT_FOUND);

	}

	@GetMapping("/certificate/withdraw/{id}")
	public ResponseEntity<String> generateWithdrawOperationCertificate( @PathVariable(name = "id") Long id ) throws Exception {
		return ResponseEntity.ok(this.savingsAccountService.generateWithdrawOperationCertificate(id));
	}

	@PostMapping("/operation/transfer")
	public ResponseEntity<TransferOperation> tranferOperation ( @RequestBody TransferOperation transferOperation){

		return ResponseEntity.ok(this.savingsAccountService.transfer(transferOperation));
	}
	
	@GetMapping(value = "/certificate/transfer/{id}", produces = "application/text")
	public ResponseEntity<String> generateTransferCertificate( @PathVariable(name = "id") Long transferId ) throws Exception{
	
		return ResponseEntity.ok(this.savingsAccountService.generateTransferCertificate(transferId));
	}
	
}
