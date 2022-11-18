package com.br.mybank.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.mybank.Service.CertificateService;

@RestController
@RequestMapping("/certificate")
public class CertificateController {

	
	@Autowired
	protected CertificateService certificateService;

	
	@GetMapping(value="/create/{id}",produces = "application/text")
	public ResponseEntity<String> generateSavingAccountCertificate( @PathVariable(name = "id") Long accountId ) throws InterruptedException{
		
		return ResponseEntity.ok(this.certificateService.generateCreateAccountCertificate(accountId));
		
	}
	
	
	@GetMapping(value="/withdraw/{id}", produces = "application/text")
	public ResponseEntity<String> generateWithdrawOperationCertificate( @PathVariable(name = "id") Long id ) throws Exception {
		return ResponseEntity.ok(this.certificateService.generateWithdrawOperationCertificate(id));
	}

	
	@GetMapping(value = "/transfer/{id}", produces = "application/text")
	public ResponseEntity<String> generateTransferCertificate( @PathVariable(name = "id") Long transferId ) throws Exception{
	
		return ResponseEntity.ok(this.certificateService.generateTransferCertificate(transferId));
	}
	
}
